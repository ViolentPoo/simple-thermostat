<div align="center">

# Simple Thermostat

### A HVAC, thermostat, climate, fan, and humidifier card for Home Assistant Lovelace UI

[![HACS Custom](https://img.shields.io/badge/HACS-CUSTOM-41BDF5?style=for-the-badge&logo=home-assistant&logoColor=white&labelColor=555555)](https://github.com/hacs/integration)
[![Home Assistant 2024.8+](https://img.shields.io/badge/HOME%20ASSISTANT-2024.8%2B-41BDF5?style=for-the-badge&logo=home-assistant&logoColor=white&labelColor=555555)](https://www.home-assistant.io/)
[![Latest release](https://img.shields.io/github/v/release/Wheemer/simple-thermostat?style=for-the-badge&logo=github&logoColor=white&label=RELEASE&labelColor=555555&color=22C55E)](https://github.com/Wheemer/simple-thermostat/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/Wheemer/simple-thermostat/total?style=for-the-badge&logo=github&logoColor=white&label=DOWNLOADS&labelColor=555555&color=8A2BE2)](https://github.com/Wheemer/simple-thermostat/releases)

<p>
  <strong>⭐ NEW V4 RELEASE ⭐</strong><br>
  Fan, humidifier, dehumidifier, modern actions, and enhanced visuals
</p>

</div>

A Codex assisted, community maintained fork of [simple-thermostat](https://github.com/nervetattoo/simple-thermostat) by [@nervetattoo](https://github.com/nervetattoo), kept working with current Home Assistant releases. The v4 modernization was heavily influenced by [duczz/ha-simple-thermostat](https://github.com/duczz/ha-simple-thermostat).

A compact Lovelace card for Home Assistant climate, fan, humidifier, and dehumidifier entities. It keeps the original small-card style while adding domain-aware setpoints, current values, action handling, richer mode controls, and enhanced visuals.

<div style="border: 1px solid rgba(65, 189, 245, 0.45); border-radius: 8px; padding: 16px 18px; margin: 18px 0;">
  <strong style="color: #41bdf5;">New in v4:</strong> Fan, humidifier, and dehumidifier support, domain-aware controls, modern Home Assistant actions, richer mode buttons, and enhanced visuals.
</div>

<img src="examples.png" alt="Simple Thermostat v4 examples" width="900">

<div style="border: 1px solid rgba(65, 189, 245, 0.45); border-radius: 8px; padding: 16px 18px; margin: 18px 0;">
  <strong style="color: #41bdf5;">Requires:</strong> Home Assistant 2024.8 or newer. v4 uses Home Assistant's current frontend action API.
</div>

<div style="border: 1px solid rgba(65, 189, 245, 0.45); border-radius: 8px; padding: 16px 18px; margin: 18px 0;">
  <strong style="color: #41bdf5;">Compatibility:</strong> v4 imports older <code>current_temperature_entity</code>, <code>sensors</code>, and <code>layout.sensors</code> YAML into the current <code>current_value_entity</code>, <code>entities</code>, and <code>layout.entities</code> config shape. If you are staying on v3, use the <a href="https://github.com/Wheemer/simple-thermostat/tree/v3">v3 documentation</a>.
</div>

## Installation

### HACS

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Wheemer&repository=simple-thermostat&category=plugin)

Or add it manually in HACS:

1. Open **HACS** in Home Assistant.
2. Open **Custom repositories**.
3. Add this repository:

   ```text
   https://github.com/Wheemer/simple-thermostat
   ```

4. Choose type **Dashboard**.
5. Install **Simple Thermostat**.
6. Refresh Home Assistant and clear the browser cache if the old card is still loaded.

### Migrating from another fork

If you installed `simple-thermostat` from another repository, uninstall the old HACS entry first. Then add this repository as the dashboard custom repository and install it again.

If you are not upgrading to v4, keep using the [v3 documentation](https://github.com/Wheemer/simple-thermostat/tree/v3) for the older config surface.

### Manual install

1. Download `simple-thermostat.js` from the [latest release](https://github.com/Wheemer/simple-thermostat/releases/latest).
2. Put it in your Home Assistant `www` folder.
3. Add this Lovelace resource:

   ```yaml
   resources:
     - url: /local/simple-thermostat.js
       type: module
   ```

## Changelog

| Version | Change |
| --- | --- |
| <code>v4.0.0&#8209;rc.3</code> | Preserved last valid render during transient missing entity updates. |
| <code>v4.0.0&#8209;rc.3</code> | Tightened single-row entity spacing. |
| <code>v4.0.0&#8209;rc.3</code> | Standardized dense mode button sizing. |
| <code>v4.0.0&#8209;rc.3</code> | Added lifecycle regression tests. |
| <code>v4.0.0&#8209;rc.2</code> | Improved <code>enhanced_visuals: false</code> v3-style defaults. |
| <code>v4.0.0&#8209;rc.2</code> | Improved state text for climate, fan, humidifier, and dehumidifier cards. |
| <code>v4.0.0&#8209;rc.2</code> | Refined header and entity toggle colors. |
| <code>v4.0.0&#8209;rc.2</code> | Increased active icon animation visibility. |
| <code>v4.0.0&#8209;rc.2</code> | Cleaned up dense climate mode layouts. |
| <code>v4.0.0&#8209;rc.2</code> | Added contextual fan speed icons. |
| <code>v4.0.0&#8209;rc.2</code> | Linked v3 documentation. |
| <code>v4.0.0&#8209;rc.1</code> | Added domain-aware climate, fan, humidifier, and dehumidifier support. |
| <code>v4.0.0&#8209;rc.1</code> | Added fan percentage setpoints and mode controls. |
| <code>v4.0.0&#8209;rc.1</code> | Added humidifier and dehumidifier humidity controls. |
| <code>v4.0.0&#8209;rc.1</code> | Added v4 enhanced visuals. |
| <code>v4.0.0&#8209;rc.1</code> | Added Home Assistant 2024.8+ action support. |
| <code>v4.0.0&#8209;rc.1</code> | Kept legacy config aliases supported. |
| <code>v4.0.0</code> | Requires Home Assistant 2024.8+. |
| <code>v4.0.0</code> | Added climate, fan, humidifier, and dehumidifier domain adapters. |
| <code>v4.0.0</code> | Added generic <code>current_value_entity</code> and <code>entities</code> options. |
| <code>v4.0.0</code> | Added automatic current value defaults and <code>hide_setpoint</code>. |
| <code>v4.0.0</code> | Added state-aware headers, richer mode controls, horizontal setpoint controls, target value actions, and entity-aware editor options. |
| <code>v4.0.0</code> | Added <code>enhanced_visuals</code> and documented CSS variables. |
| <code>v4.0.0</code> | Updated service calls, custom element registration, HACS packaging, and GitHub Actions builds. |

## Basic Usage

Climate entity:

```yaml
type: custom:simple-thermostat
entity: climate.living_room
```

Fan entity:

```yaml
type: custom:simple-thermostat
entity: fan.range_hood
```

Humidifier or dehumidifier entity:

```yaml
type: custom:simple-thermostat
entity: humidifier.basement_dehumidifier
```

## Visual Editor

The card includes a visual editor for common setup.

The editor shows options that are relevant to the selected entity:

- Entity and current value selection for climate and humidifier-style cards.
- Fan, HVAC, preset, swing, vane, direction, oscillating, and humidifier mode controls only when the selected entity supports them.
- Header toggle icon options only after a header toggle entity is configured.
- Extra entity layout options only when extra entities are configured.
- Hide setpoint controls only when the selected entity has a setpoint.

Advanced mode filtering, extra entity rows, custom actions, and custom CSS are still configured in YAML.

## Examples

### Compact Climate Card

```yaml
type: custom:simple-thermostat
entity: climate.living_room
step_size: 0.5
header:
  name: Living Room
  icon: mdi:radiator
  toggle:
    entity: switch.heater
    name: Heater
    icon: mdi:radiator
control:
  - hvac
  - preset
entities:
  - entity: sensor.living_room_temperature
    icon: mdi:thermometer
  - entity: sensor.living_room_humidity
    icon: mdi:water-percent
```

### Fan With Speeds

```yaml
type: custom:simple-thermostat
entity: fan.range_hood
control:
  - fan
  - state
```

### Dehumidifier

```yaml
type: custom:simple-thermostat
entity: humidifier.basement_dehumidifier
control:
  - mode
  - state
```

### Hide The Setpoint

```yaml
type: custom:simple-thermostat
entity: climate.living_room
hide_setpoint: true
```

This hides the target value and setpoint controls while keeping supported mode controls visible.

## Configuration

### Main Options

| Option                 | Type                   | Description                                                                                                                                                                   |
| ---------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity`               | string                 | Climate, fan, humidifier, or dehumidifier entity id. Required.                                                                                                                |
| `current_value_entity` | string                 | Entity used for the displayed current value instead of the main entity.                                                                                                       |
| `unit`                 | string, boolean        | Override the target unit, or set `false` to hide it.                                                                                                                          |
| `decimals`             | number                 | Decimal places for target display.                                                                                                                                            |
| `step_size`            | number                 | Amount changed by the target controls.                                                                                                                                        |
| `hide_setpoint`        | boolean                | Hide target value and setpoint controls.                                                                                                                                      |
| `fallback`             | string                 | Text shown when no valid setpoint exists. Default `N/A`.                                                                                                                      |
| `enhanced_visuals`     | boolean                | Enable v4 visual polish. Set to `false` for v3-style visual defaults while keeping v4 fixes and compatibility. Defaults to `true` and only needs to be written when disabled. |
| `header`               | object, `false`        | Header configuration.                                                                                                                                                         |
| `hide`                 | object                 | Hide built-in state or current value rows.                                                                                                                                    |
| `label`                | object                 | Override built-in row labels.                                                                                                                                                 |
| `layout`               | object                 | Layout settings.                                                                                                                                                              |
| `control`              | array, object, `false` | Mode controls.                                                                                                                                                                |
| `entities`             | array, `false`         | Extra entity rows.                                                                                                                                                            |
| `setpoints`            | object, `false`        | Manual setpoint configuration. Usually not needed.                                                                                                                            |
| `service`              | object                 | Override the action used to set the target value.                                                                                                                             |
| `styles`               | string                 | Inline CSS scoped to this card.                                                                                                                                               |
| `tap_action`           | object                 | Action fired from the target value.                                                                                                                                           |
| `hold_action`          | object                 | Hold action fired from the target value.                                                                                                                                      |
| `double_tap_action`    | object                 | Double tap action fired from the target value.                                                                                                                                |

### Domain Defaults

The card chooses the right behavior from the entity domain:

| Domain       | Target      | Current value                                            | Default controls                          |
| ------------ | ----------- | -------------------------------------------------------- | ----------------------------------------- |
| `climate`    | Temperature | `current_temperature` or configured current value entity | HVAC, preset, fan, swing, vane            |
| `fan`        | Percentage  | Percentage when available                                | Fan speeds, direction, oscillating, state |
| `humidifier` | Humidity    | `current_humidity`                                       | Mode, state                               |

Dehumidifiers use the Home Assistant `humidifier` domain.

## Header

Hide the header:

```yaml
header: false
```

Configure the header:

```yaml
header:
  name: My Room
  icon: mdi:sofa
  toggle:
    entity: switch.room_fan
    name: Fan
    icon: mdi:fan
```

Use multiple header toggles:

```yaml
header:
  name: My Room
  toggles:
    - entity: switch.boost
      name: Boost
      icon: mdi:rocket-launch
    - entity: switch.eco_mode
      name: Eco
      icon: mdi:leaf
```

Header options:

| Option    | Type                    | Description                                                                  |
| --------- | ----------------------- | ---------------------------------------------------------------------------- |
| `name`    | string, `false`         | Header title. Defaults to the entity friendly name.                          |
| `icon`    | string, object, `false` | Header icon override. Defaults to the entity icon, then a domain/state icon. |
| `toggle`  | object                  | Single header toggle.                                                        |
| `toggles` | array                   | Multiple header toggles.                                                     |
| `faults`  | array, `false`          | Binary sensor fault icons.                                                   |

Toggle options:

| Option   | Type            | Description                                            |
| -------- | --------------- | ------------------------------------------------------ |
| `entity` | string          | Entity to toggle.                                      |
| `name`   | string, boolean | Toggle label. Use `true` for the entity friendly name. |
| `icon`   | string          | Icon shown beside or instead of the toggle label.      |

Fault options:

| Option          | Type    | Description                           |
| --------------- | ------- | ------------------------------------- |
| `entity`        | string  | Binary sensor entity.                 |
| `icon`          | string  | Optional icon override.               |
| `hide_inactive` | boolean | Hide the icon when the sensor is off. |

## Layout

```yaml
layout:
  step: row
  mode:
    names: true
    icons: true
    headings: false
  entities:
    type: table
    labels: true
```

Layout options:

| Option                   | Type            | Description                                                                                                                                                                                                                             |
| ------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout.step`            | `row`, `column` | Setpoint control layout. Enhanced v4 visuals default to the horizontal minus/value/plus layout. With `enhanced_visuals: false`, unset cards use the v3-style column chevron layout. Explicit `layout.step` values are always respected. |
| `layout.mode.names`      | boolean         | Show text on mode buttons.                                                                                                                                                                                                              |
| `layout.mode.icons`      | boolean         | Show icons on mode buttons.                                                                                                                                                                                                             |
| `layout.mode.headings`   | boolean         | Show mode row headings. Defaults to hidden.                                                                                                                                                                                             |
| `layout.entities.type`   | `table`, `list` | Extra entity row layout.                                                                                                                                                                                                                |
| `layout.entities.labels` | boolean         | Show labels for extra entity rows.                                                                                                                                                                                                      |

## Tweaks

V4 enhanced visuals are enabled by default:

```yaml
enhanced_visuals: true
```

Set `enhanced_visuals: false` when you want a quieter, v3-style presentation while still using v4 behavior:

- Active button underline.
- Mode button hover lift and hover tint.
- Mode icon hover lift.
- Button press shrink.
- Setpoint update pulse.
- Active heating, cooling, humidifying, dehumidifying, and fan header animations.
- Custom off-icon slash overlay.
- Loading shimmer.
- Compact icon treatment for mode buttons.

When this is disabled, the card uses v3-style visual defaults such as column setpoint chevrons and tighter mode rows unless you explicitly configure an option such as `layout.step: row`. The visual editor should only write the `enhanced_visuals` toggle when that is the only changed setting; displayed defaults are not saved back into YAML.

## Controls

By default, the card shows supported controls for the selected entity.

Simple format:

```yaml
control:
  - hvac
  - preset
  - fan
```

Object format:

```yaml
control:
  hvac: true
  preset:
    away: true
    none:
      name: Not set
```

Disable controls:

```yaml
control: false
```

Supported control types:

| Control            | Used by         | Description                                        |
| ------------------ | --------------- | -------------------------------------------------- |
| `hvac`             | Climate         | HVAC modes such as off, heat, cool, dry, fan only. |
| `preset`           | Climate         | Preset modes such as away, eco, comfort, sleep.    |
| `fan`              | Climate, fan    | Fan modes or fan speeds.                           |
| `state`            | Fan, humidifier | On and off buttons.                                |
| `swing`            | Climate         | Swing modes.                                       |
| `swing_horizontal` | Climate         | Horizontal swing modes.                            |
| `swing_vertical`   | Climate         | Vertical swing modes.                              |
| `vane_horizontal`  | Climate         | Horizontal vane modes.                             |
| `vane_vertical`    | Climate         | Vertical vane modes.                               |
| `direction`        | Fan             | Forward and reverse direction.                     |
| `oscillating`      | Fan             | Oscillation on and off.                            |
| `mode`             | Humidifier      | Humidifier or dehumidifier modes.                  |

Per-row options:

| Option           | Description                                |
| ---------------- | ------------------------------------------ |
| `_name`          | Override the row heading.                  |
| `_heading`       | Set to `true` to show the row heading.     |
| `_hide_when_off` | Hide the row when the main entity is off.  |
| `_icons`         | Set to `false` to hide icons for this row. |

Per-mode options:

| Option    | Description                    |
| --------- | ------------------------------ |
| `name`    | Override a mode label.         |
| `icon`    | Override a mode icon.          |
| `include` | Set to `false` to hide a mode. |

Quote `on` and `off` when using them as YAML keys:

```yaml
control:
  hvac:
    'off':
      name: Off
    'heat':
      name: Heat
```

Mode headings are hidden by default in v4. Use `_heading: true` only where a visible row label helps.

## Extra Entities

Use `entities` to show extra rows in the card.

```yaml
entities:
  - entity: sensor.living_room_humidity
  - entity: sensor.living_room_energy
    name: Energy today
  - attribute: min_temp
    name: Min temp
  - entity: input_boolean.heating_boost
    name: Boost
```

Toggle-capable entities render as switches automatically.

Supported toggle domains:

- `automation`
- `fan`
- `humidifier`
- `input_boolean`
- `light`
- `switch`

Entity options:

| Option      | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| `entity`    | string | Entity id.                                   |
| `name`      | string | Label override.                              |
| `icon`      | string | Icon shown instead of a text label.          |
| `attribute` | string | Read an attribute instead of state.          |
| `unit`      | string | Unit suffix.                                 |
| `decimals`  | number | Decimal places for numeric values.           |
| `type`      | string | Use `relativetime` for relative time output. |

Hide extra entities:

```yaml
entities: false
```

Hide built-in rows:

```yaml
hide:
  state: true
  temperature: true
```

The `temperature` key is kept for compatibility and means the built-in current value row.

## Setpoints

Setpoints are detected automatically:

- Climate entities use temperature setpoints.
- Fan entities use percentage.
- Humidifier and dehumidifier entities use humidity.

Override setpoints only when needed.

Single setpoint:

```yaml
setpoints:
  temperature:
```

Dual setpoint:

```yaml
setpoints:
  target_temp_low:
  target_temp_high:
```

Hide one setpoint:

```yaml
setpoints:
  target_temp_low:
    hide: true
  target_temp_high:
```

## Service Override

Override the service used when setting the target value:

```yaml
service:
  domain: climate
  service: set_temperature
  data:
    entity_id: climate.living_room
```

The card calls Home Assistant actions using the current `hass.performAction` API.

## Actions

The target value supports Home Assistant-style actions:

```yaml
tap_action:
  action: more-info
hold_action:
  action: navigate
  navigation_path: /lovelace/climate
double_tap_action:
  action: none
```

Supported action handling follows the same shape used by Home Assistant dashboard cards.

## CSS Variables

| Variable                             | Default                                                                                       | Description                                                                     |
| ------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `--st-spacing`                       | `4px`                                                                                         | Base spacing unit.                                                              |
| `--st-font-size-xl`                  | `28px`                                                                                        | Target value on wide screens.                                                   |
| `--st-font-size-l`                   | `22px`                                                                                        | Target value on narrow screens.                                                 |
| `--st-font-size-m`                   | `var(--ha-font-size-xl, 20px)`                                                                | Target unit size.                                                               |
| `--st-font-size-title`               | `var(--ha-card-header-font-size, 24px)`                                                       | Header title size.                                                              |
| `--st-font-size-entities`            | `var(--ha-font-size-l, 16px)`                                                                 | Extra entity and mode label text.                                               |
| `--st-font-size-toggle-label`        | `var(--ha-font-size-l, 16px)`                                                                 | Header toggle label.                                                            |
| `--st-control-icon-size`             | `var(--st-font-size-xl, 32px)`                                                                | Header, state, and HVAC control icon size.                                      |
| `--st-font-size-preset-icon`         | `var(--ha-font-size-xl, 20px)`                                                                | Preset mode icon size.                                                          |
| `--st-font-size-compact-mode`        | `var(--ha-font-size-m, 14px)`                                                                 | Text size for compact horizontal preset and fan speed buttons.                  |
| `--st-font-size-compact-mode-icon`   | `20px`                                                                                        | Icon size for compact horizontal preset and fan speed buttons.                  |
| `--st-mode-background`               | `var(--secondary-background-color)`                                                           | Inactive mode background.                                                       |
| `--st-mode-active-background`        | `var(--primary-color)`                                                                        | Active mode background.                                                         |
| `--st-mode-active-color`             | `var(--text-primary-color)`                                                                   | Active mode text.                                                               |
| `--st-mode-hover-background`         | mixed from inactive mode background and text color                                            | Inactive mode hover background.                                                 |
| `--st-mode-hover-color`              | `var(--primary-text-color)`                                                                   | Inactive mode hover text.                                                       |
| `--st-mode-active-accent-color`      | mixed from active mode text color                                                             | Active button underline and accent.                                             |
| `--st-mode-border-radius`            | `var(--ha-card-border-radius, 4px)`                                                           | Mode button corner radius.                                                      |
| `--st-mode-transition`               | `200ms ease`                                                                                  | Mode button color transition.                                                   |
| `--st-active-icon-glow-duration`     | `5s`                                                                                          | Active heating, cooling, humidifying, and dehumidifying header icon glow cycle. |
| `--st-active-icon-glow-min-size`     | `4px`                                                                                         | Faintest active header icon glow radius.                                        |
| `--st-active-icon-glow-mid-size`     | `9px`                                                                                         | Midpoint active header icon glow radius.                                        |
| `--st-active-icon-glow-max-size`     | `14px`                                                                                        | Strongest active header icon glow radius.                                       |
| `--st-active-icon-glow-min-strength` | `36%`                                                                                         | Faintest active header icon glow opacity mix.                                   |
| `--st-active-icon-glow-mid-strength` | `52%`                                                                                         | Midpoint active header icon glow opacity mix.                                   |
| `--st-active-icon-glow-max-strength` | `70%`                                                                                         | Strongest active header icon glow opacity mix.                                  |
| `--auto-color`                       | `var(--state-climate-auto-color, var(--primary-color))`                                       | Active auto mode.                                                               |
| `--heat_cool-color`                  | `var(--state-climate-heat-cool-color, var(--primary-color))`                                  | Active heat/cool mode.                                                          |
| `--cool-color`                       | `var(--state-climate-cool-color, var(--primary-color))`                                       | Active cool mode.                                                               |
| `--heat-color`                       | `var(--state-climate-heat-color, var(--primary-color))`                                       | Active heat mode.                                                               |
| `--off-color`                        | `var(--state-icon-color, var(--secondary-text-color))`                                        | Active off mode.                                                                |
| `--fan_only-color`                   | `var(--state-climate-fan-only-color, var(--state-fan-active-color, var(--state-icon-color)))` | Active fan-only mode.                                                           |
| `--dry-color`                        | `var(--state-climate-dry-color, var(--primary-color))`                                        | Active dry mode.                                                                |
| `--st-toggle-label-color`            | `var(--primary-text-color)`                                                                   | Header toggle label color.                                                      |
| `--st-fault-inactive-color`          | `var(--secondary-background-color)`                                                           | Inactive fault icon.                                                            |
| `--st-fault-active-color`            | `var(--accent-color)`                                                                         | Active fault icon.                                                              |

Per-card override with [card-mod](https://github.com/thomasloven/lovelace-card-mod):

```yaml
type: custom:simple-thermostat
entity: climate.my_room
card_mod:
  style: |
    ha-card {
      --st-font-size-xl: 18px;
      --st-font-size-l: 16px;
      --st-spacing: 2px;
      --cool-color: var(--state-climate-cool-color);
    }
```

Theme override:

```yaml
my-theme:
  st-font-size-xl: 18px
  st-spacing: 2px
```
