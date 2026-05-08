# simple-thermostat

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

> An AI assisted community-maintained fork of [simple-thermostat](https://github.com/nervetattoo/simple-thermostat) by [@nervetattoo](https://github.com/nervetattoo), kept up to date with current Home Assistant releases.

A Lovelace thermostat card focused on compact layout, easy interaction, and flexible configuration. Embed relevant sensors, customise controls, and theme to taste.

![Example thermostat](https://github.com/Wheemer/simple-thermostat/raw/master/examples.png)

## Changelog

| Version | Changes |
|---------|---------|
| 3.0.18 | Added `swing_horizontal` and `swing_vertical` control mode support for HA-standard climate entities (e.g. Daikin units). |
| 3.0.17 | Added `current_temperature_entity` option to override the entity used for current temperature display. |
| 3.0.16 | Fixed font sizing broken by HA 2025.5 removal of deprecated `--paper-*` CSS variables. |
| 3.0.15 | Fixed duplicate custom element registration error on Safari and iOS. |
| 3.0.14 | Fixed error when used inside collapsible or other custom container cards. |
| 3.0.13 | Fixed unlisted preset modes (e.g. `away_indefinitely`) appearing when explicit mode config is provided. |
| 3.0.12 | Added `vane_horizontal` and `vane_vertical` control mode support for Intesis-style climate entities. |
| 3.0.11 | Show OFF for unavailable target temperature when heater is off. |
| 3.0.10 | Locale-aware number formatting for temperatures and sensor values. |
| 3.0.9 | Added row-level `_icons` option for mode controls. |
| 3.0.8 | Fixed `version: 3` templated sensor crash for some HA language configs. |
| 3.0.7 | Fixed target temperature font size on themes without paper-font variables. |
| 3.0.5 | Fixed updating-state CSS class binding for target temperature display. |
| 3.0.4 | Updated localization for Home Assistant 2026.5.0 compatibility. |
| 3.0.0 | Updated to Lit 3.x, updated all dependencies. |

## Installation

**Via HACS (recommended):**

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Wheemer&repository=simple-thermostat&category=plugin)

Add `https://github.com/Wheemer/simple-thermostat` as a custom HACS repository, then install from HACS. Clear your browser cache after installing.

**Manual:**

1. Download `simple-thermostat.js` from the [latest release](https://github.com/Wheemer/simple-thermostat/releases/latest) and place it in your `www` folder.
2. Add to Lovelace resources:

```yaml
resources:
  - url: /local/simple-thermostat.js
    type: module
```

**Migrating from the original or another fork:**

Remove the existing integration from HACS, add this repository as a custom repository, and reinstall. Clear your browser cache.

## Configuration

```yaml
type: custom:simple-thermostat
entity: climate.my_room        # Required
```

### All options

- `entity` _string_: Climate entity id. **Required.**
- `current_temperature_entity` _string_: Entity to use for current temperature display instead of the climate entity's own reading.
- `unit` _string|false_: Override the temperature unit. Set to `false` to hide.
- `decimals` _number_: Decimal places for temperature display. `0` or `1`.
- `step_size` _number_: Step size for temperature up/down buttons. Default: `0.5`.
- `fallback` _string_: Text shown when no valid setpoint is available. Default: `N/A`.
- `label` _object_: Override labels.
  - `temperature` _string_
  - `state` _string_
- `hide` _object_: Hide information fields.
  - `temperature` _boolean_: Default `false`.
  - `state` _boolean_: Default `false`.
- `layout` _object_:
  - `step` _row|column_: Position of the up/down temperature buttons. Default: `column`.
  - `mode` _object_: Global display options for all mode rows.
    - `names` _boolean_
    - `icons` _boolean_
    - `headings` _boolean_
  - `sensors` _object_:
    - `type` _list|table_: Sensor layout style.
    - `labels` _boolean_: Show sensor labels.
- `header` _false|object_: See [Header](#header).
- `setpoints` _false|object_: See [Setpoints](#setpoints).
- `control` _false|array|object_: See [Control](#control).
- `sensors` _false|array_: See [Sensors](#sensors).
- `service` _object_: Override the service call used to set temperature.
  - `domain` _string_
  - `service` _string_
  - `data` _object_: Extra data to include in the service call.

---

## Compact mode

Hide everything except sensors and temperature control:

```yaml
type: custom:simple-thermostat
entity: climate.hvac
layout:
  step: row
header: false
control: false
```

---

## Header

Hide the header entirely:

```yaml
header: false
```

Or configure it:

```yaml
header:
  name: My Room          # Overrides friendly name
  icon: mdi:sofa
  toggle:
    entity: switch.fan
    name: Fan            # Set to true to use the entity's friendly name
  faults:
    - entity: binary_sensor.filter_fault
    - entity: binary_sensor.low_battery
      icon: mdi:battery-low
      hide_inactive: true
```

**Header options:**

- `name` _string_: Override the card title.
- `icon` _string|object_: Icon next to the title. Defaults to the current `hvac_action` or state. Can be an object to override per action/state:
  - Per `hvac_action`: `auto`, `cooling`, `fan`, `heating`, `idle`, `"off"`
  - Per state: `auto`, `cool`, `dry`, `fan_only`, `heat`, `heat_cool`, `"off"`
- `toggle` _object_: Add a toggle switch in the header for a related entity.
  - `entity` _string_
  - `name` _string|true_
- `faults` _array|false_: Show binary sensor fault indicators in the header.
  - `entity` _string_
  - `icon` _string_: Override icon.
  - `hide_inactive` _boolean_: Hide when inactive. Default `false`.

---

## Setpoints

Single and dual setpoints are detected automatically. Override manually only if needed.

```yaml
setpoints:
  temperature:          # Single setpoint
```

```yaml
setpoints:
  target_temp_low:      # Dual setpoint
  target_temp_high:
```

Hide one of a dual setpoint pair:

```yaml
setpoints:
  target_temp_low:
    hide: true
  target_temp_high:
```

---

## Control

By default the card shows `hvac` and `preset` controls if the entity supports them.

**Simple array format:**

```yaml
control:
  - hvac
  - preset
  - fan
```

**Object format** — unlisted modes are hidden automatically:

```yaml
control:
  hvac: true
  preset:
    away: true
    none:
      name: Not set
```

**Available mode types:** `hvac`, `fan`, `preset`, `swing`, `swing_horizontal`, `swing_vertical`, `vane_horizontal`, `vane_vertical`

> `swing_horizontal` and `swing_vertical` follow the HA standard introduced in Core 2024.12 (e.g. Daikin units).
> `vane_horizontal` and `vane_vertical` are for Intesis-style integrations that expose `_positions` attributes.

**Per-mode options** (object format only):

- `_name` _string_: Override the mode row heading.
- `_hide_when_off` _boolean_: Hide this row when the entity is off. Default `false`.
- `_icons` _false_: Hide icons for this mode row only.
- `{mode_value}` _true|false|object_: Control individual mode buttons.
  - `name` _string|false_: Custom label or `false` to show icon only.
  - `icon` _string|false_: Custom icon or `false` to hide.

**Examples:**

Hide icons on the fan row only:

```yaml
control:
  fan:
    _icons: false
```

Quote `on`/`off` keys to prevent YAML boolean interpretation:

```yaml
control:
  hvac:
    "off":
      name: Off
    "on":
      name: On
```

Horizontal/vertical swing (HA standard):

```yaml
control:
  hvac: true
  swing: true
  swing_horizontal: true
  swing_vertical: true
```

Vane controls (Intesis-style):

```yaml
control:
  vane_horizontal:
    _name: H-Vane
  vane_vertical:
    _name: V-Vane
```

Disable controls entirely:

```yaml
control: false
```

---

## Sensors

```yaml
sensors:
  - entity: sensor.living_room_humidity
  - entity: sensor.living_room_energy
    name: Energy today
  - attribute: min_temp
    name: Min temp
  - entity: sensor.last_motion
    type: relativetime
```

**Sensor options:**

- `entity` _string_: Sensor entity id.
- `name` _string_: Override the friendly name.
- `icon` _string_: Show an icon instead of a label.
- `attribute` _string_: Use an attribute instead of state. If no `entity` is given, reads from the main climate entity.
- `unit` _string_: Unit to display (useful with `attribute`).
- `decimals` _number_: Round numeric value to this many decimal places.
- `type` _relativetime_: Render value as a relative time string.

Hide sensors entirely:

```yaml
sensors: false
```

### Version 3 templated sensors

Set `version: 3` to enable template-based sensor rows with access to entity state, attributes, variables, and translated UI strings.

```yaml
type: custom:simple-thermostat
entity: climate.living_room
version: 3
sensors:
  - id: humidity
    entity: sensor.living_room_humidity
    label: Humidity
    template: "{{state.text}}%"
  - id: state
    show: false         # Hide the built-in state row
```

Built-in rows `state` and `temperature` are added automatically unless you define a sensor with the same `id`.

**Version 3 sensor options:**

- `id` _string_: Unique id. Use `state` or `temperature` to override built-ins.
- `entity` _string_: Template context entity. Defaults to main climate entity.
- `label` _string|false_: Row label. Set to `false` to hide.
- `template` _string_: Template to render the value.
- `unit` _string_: Unit suffix.
- `decimals` _number_: Decimal places.
- `show` _boolean_: Set to `false` to hide the row.

---

## CSS variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--st-spacing` | `4px` | Base spacing unit |
| `--st-font-size-xl` | `24px` | Target temperature, wide viewports |
| `--st-font-size-l` | `20px` | Target temperature, narrow viewports |
| `--st-font-size-m` | `var(--ha-font-size-xl, 20px)` | Temperature unit |
| `--st-font-size-title` | `var(--ha-card-header-font-size, 24px)` | Card title |
| `--st-font-size-sensors` | `var(--ha-font-size-l, 16px)` | Sensors and mode labels |
| `--st-font-size-toggle-label` | `var(--ha-font-size-l, 16px)` | Header toggle label |
| `--st-mode-background` | `var(--secondary-background-color)` | Inactive mode button background |
| `--st-mode-active-background` | `var(--primary-color)` | Active mode button background |
| `--st-mode-active-color` | `var(--text-primary-color)` | Active mode button text |
| `--st-toggle-label-color` | `var(--primary-text-color)` | Header toggle label color |
| `--st-fault-inactive-color` | `var(--secondary-background-color)` | Inactive fault icon color |
| `--st-fault-active-color` | `var(--accent-color)` | Active fault icon color |

Override per card using [card-mod](https://github.com/thomasloven/lovelace-card-mod):

```yaml
type: custom:simple-thermostat
entity: climate.my_room
card_mod:
  style: |
    ha-card {
      --st-font-size-xl: 18px;
      --st-font-size-l: 16px;
      --st-spacing: 2px;
    }
```

Or globally in your theme (omit `--` prefix in theme YAML):

```yaml
my-theme:
  st-font-size-xl: 18px
  st-spacing: 2px
```
