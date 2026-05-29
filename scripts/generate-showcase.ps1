Add-Type -AssemblyName System.Drawing.Common

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out = Join-Path $root 'examples.png'

$width = 1500
$height = 1050
$bmp = [System.Drawing.Bitmap]::new($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

function Color([string]$hex, [int]$alpha = 255) {
  $hex = $hex.TrimStart('#')
  return [System.Drawing.Color]::FromArgb(
    $alpha,
    [Convert]::ToInt32($hex.Substring(0, 2), 16),
    [Convert]::ToInt32($hex.Substring(2, 2), 16),
    [Convert]::ToInt32($hex.Substring(4, 2), 16)
  )
}

function Brush([string]$hex, [int]$alpha = 255) {
  return [System.Drawing.SolidBrush]::new((Color $hex $alpha))
}

function Pen([string]$hex, [float]$size = 1, [int]$alpha = 255) {
  return [System.Drawing.Pen]::new((Color $hex $alpha), $size)
}

function Font([float]$size, [int]$style = 0) {
  return [System.Drawing.Font]::new('Segoe UI', $size, [System.Drawing.FontStyle]$style, [System.Drawing.GraphicsUnit]::Pixel)
}

function PathRound([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

function FillRound([float]$x, [float]$y, [float]$w, [float]$h, [float]$r, [string]$fill, [int]$alpha = 255) {
  $path = PathRound $x $y $w $h $r
  $b = Brush $fill $alpha
  $g.FillPath($b, $path)
  $b.Dispose()
  $path.Dispose()
}

function StrokeRound([float]$x, [float]$y, [float]$w, [float]$h, [float]$r, [string]$stroke = '#3a3a3a', [float]$size = 2) {
  $path = PathRound $x $y $w $h $r
  $p = Pen $stroke $size
  $g.DrawPath($p, $path)
  $p.Dispose()
  $path.Dispose()
}

function Text([string]$s, [float]$x, [float]$y, [float]$size, [string]$color = '#e8eaed', [int]$style = 0, [float]$w = 1000, [float]$h = 80, [string]$align = 'Near') {
  $f = Font $size $style
  $b = Brush $color
  $fmt = [System.Drawing.StringFormat]::new()
  $fmt.Alignment = [System.Drawing.StringAlignment]::$align
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Near
  $g.DrawString($s, $f, $b, [System.Drawing.RectangleF]::new($x, $y, $w, $h), $fmt)
  $fmt.Dispose()
  $b.Dispose()
  $f.Dispose()
}

function Button([float]$x, [float]$y, [float]$w, [float]$h, [string]$label, [string]$icon, [bool]$active = $false, [string]$activeColor = '#10a7c9', [bool]$compact = $false) {
  $fill = if ($active) { $activeColor } else { '#252525' }
  $text = if ($active) { '#ffffff' } else { '#b7b7b7' }
  FillRound $x $y $w $h 8 $fill
  if ($active) {
    $p = Pen '#f2f2f2' 3 170
    $g.DrawLine($p, $x + 12, $y + $h - 2, $x + $w - 12, $y + $h - 2)
    $p.Dispose()
  }
  if ($compact) {
    Text $icon ($x + 22) ($y + 18) 30 $text 0 45 40 'Center'
    Text $label ($x + 66) ($y + 24) 26 $text 0 ($w - 76) 34
  } else {
    Text $icon $x ($y + 15) 30 $text 0 $w 35 'Center'
    Text $label $x ($y + 52) 24 $text 0 $w 35 'Center'
  }
}

function Toggle([float]$x, [float]$y, [string]$label, [string]$icon, [bool]$on) {
  Text $icon $x ($y - 5) 34 '#e0e0e0' 0 42 44 'Center'
  Text $label ($x - 88) ($y + 1) 26 '#eeeeee' 0 80 38 'Far'
  FillRound ($x + 48) $y 86 44 22 '#1f1f1f'
  StrokeRound ($x + 48) $y 86 44 22 (if ($on) { '#09a9d6' } else { '#666666' }) 2
  $knobX = if ($on) { $x + 92 } else { $x + 54 }
  FillRound $knobX ($y + 5) 34 34 17 (if ($on) { '#39c5f0' } else { '#a6a6a6' })
}

function EntityRow([float]$x, [float]$y, [string]$icon, [string]$value) {
  Text $icon $x ($y - 3) 32 '#eeeeee' 0 44 42 'Center'
  Text $value ($x + 56) $y 29 '#f1f1f1' 0 260 42
}

function Card([float]$x, [float]$y, [float]$w, [float]$h, [string]$title, [string]$icon, [bool]$slash = $false) {
  FillRound $x $y $w $h 30 '#191919' 248
  StrokeRound $x $y $w $h 30 '#3b3b3b' 2
  Text $icon ($x + 42) ($y + 42) 48 '#4c82b4' 0 60 60 'Center'
  if ($slash) {
    $p1 = Pen '#101010' 7 240
    $p2 = Pen '#4c82b4' 5 255
    $g.DrawLine($p1, $x + 48, $y + 96, $x + 96, $y + 44)
    $g.DrawLine($p2, $x + 49, $y + 94, $x + 94, $y + 47)
    $p1.Dispose(); $p2.Dispose()
  }
  Text $title ($x + 116) ($y + 44) 48 '#eeeeee' 0 ($w - 170) 64
}

function SetpointRow([float]$x, [float]$y, [string]$value, [string]$unit = '°C') {
  Text '−' $x ($y + 7) 62 '#e8e8e8' 0 80 80 'Center'
  Text $value ($x + 84) $y 68 '#eeeeee' 0 210 82 'Center'
  Text $unit ($x + 254) ($y + 24) 38 '#eeeeee' 0 60 50
  Text '+' ($x + 324) ($y + 8) 62 '#e8e8e8' 0 80 80 'Center'
}

function FanSpeedIcon([int]$n) {
  return "✤$n"
}

$bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  [System.Drawing.Rectangle]::new(0, 0, $width, $height),
  (Color '#090d12'),
  (Color '#050708'),
  90
)
$g.FillRectangle($bg, 0, 0, $width, $height)
$bg.Dispose()

Text 'Simple Thermostat v4' 0 28 56 '#f0f4f8' 1 $width 70 'Center'
Text 'New domain-aware climate, fan, humidifier, editor, and visual controls' 0 92 28 '#aeb6c2' 0 $width 40 'Center'

Card 44 160 682 420 'Main Thermostat' '▥' $false
Toggle 560 188 'Furnace' '♨' $true
EntityRow 92 278 '♨' 'Heating'
EntityRow 92 328 '♨' '21.8 °C'
EntityRow 92 378 '◉' '47.2%'
SetpointRow 388 300 '22.5'
Button 72 484 304 76 'Off' '⏻' $false '#888888' $true
Button 388 484 304 76 'Heat' '♨' $true '#ff8100' $true
Button 72 576 120 64 'None' '⊘' $false '#10a7c9' $false
Button 202 576 120 64 'Away' '⌂' $false '#10a7c9' $false
Button 332 576 120 64 'Eco' '◒' $true '#10a7c9' $false
Button 462 576 120 64 'Home' '⌂' $false '#10a7c9' $false
Button 592 576 100 64 'Sleep' 'Zz' $false '#10a7c9' $false

Card 776 160 682 420 'Range Hood Fan' '✤' $true
EntityRow 824 300 'i' 'State:  Off'
SetpointRow 1120 286 '0.0' '%'
Button 812 430 150 66 'Low' (FanSpeedIcon 1) $false '#10a7c9' $true
Button 972 430 170 66 'Medium' (FanSpeedIcon 2) $false '#10a7c9' $true
Button 1152 430 140 66 'High' (FanSpeedIcon 3) $false '#10a7c9' $true
Button 1302 430 120 66 'Max' (FanSpeedIcon 4) $false '#10a7c9' $true
Button 812 512 300 76 'Off' '⏻' $true '#8f8f8f' $true
Button 1124 512 298 76 'On' '⏻' $false '#10a7c9' $true

Card 44 630 682 340 'Basement Dehumidifier' '▧' $true
EntityRow 92 750 '◉' 'Currently:  48.7%'
EntityRow 92 800 'i' 'State:       Off'
SetpointRow 392 746 '55.0' '%'
Button 72 872 304 76 'Off' '⏻' $true '#8f8f8f' $true
Button 388 872 304 76 'On' '⏻' $false '#10a7c9' $true

FillRound 776 630 682 340 30 '#191919' 248
StrokeRound 776 630 682 340 30 '#3b3b3b' 2
Text 'Compact no-header climate' 820 676 34 '#eeeeee' 0 360 48
EntityRow 824 770 '♨' '20.9 °C'
SetpointRow 1046 744 '23.0'
Button 812 870 300 76 'Off' '⏻' $true '#8f8f8f' $true
Button 1124 870 298 76 'Cool' '❄' $false '#2b9af9' $true

$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

Write-Host $out
