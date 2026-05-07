# Lovelace simple thermostat card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

> **Note**: This is an AI assisted community maintained fork of the original [simple-thermostat](https://github.com/nervetattoo/simple-thermostat) card by [@nervetattoo](https://github.com/nervetattoo). This fork keeps the card working with current Home Assistant releases.

A different take on the thermostat card for Home Assistant Lovelace UI.
The aim is to provide a card with simpler interactions that are easier to use and take up less space, as well as provide more modularity to tweak the card. For example, the ability to embed sensor values that are relevant to your thermostat, like humidity, energy usage, or hours on.

![Example thermostat](https://github.com/nervetattoo/simple-thermostat/raw/master/thermostat-card.png)

## Compact mode

![Compact configuration](https://github.com/nervetattoo/simple-thermostat/raw/master/simple-thermostat-compact.png)

Hide everything but sensors and temperature control:

```yaml
type: custom:simple-thermostat
entity: climate.hvac
layout:
  step: row
header: false
control: false
```

## Migration from Original Repository

If you're migrating from the [original repository](https://github.com/nervetattoo/simple-thermostat) or any of the older forks:

### Switching to This Fork

**Via HACS:**

1. Remove the old integration from HACS.
2. Add this repository as a custom repository: `https://github.com/Wheemer/simple-thermostat`

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Wheemer&repository=simple-thermostat&category=plugin)

3. Install from HACS.
4. Clear your browser cache after updating.

**Manual:**

1. Download `simple-thermostat.js` from the [latest release](https://github.com/Wheemer/simple-thermostat/releases/latest).
2. Replace the existing file in your `www` folder.
3. Clear your browser cache.

## Changelog

| Version | Changes |
|---------|---------|
| 3.0.12 | Added `vane_horizontal` and `vane_vertical` control mode support |
| 3.0.11 | Show OFF for unavailable target temperature when heater is off |
| 3.0.10 | Locale-aware number formatting for temperatures and sensor values |
| 3.0.9 | Added row-level `_icons` option for mode controls |
| 3.0.8 | Fixed `version: 3` templated sensor crash for some HA language configs |
| 3.0.7 | Fixed target temperature font size on themes without paper-font variables |
| 3.0.5 | Fixed updating-state CSS class binding for target temperature display |
| 3.0.4 | Updated localization for Home Assistant 2026.5.0 compatibility |
| 3.0.0 | Updated to Lit 3.x, updated all dependencies |

## Requirements

Home Assistant 2021.11.0 or higher.

## Installation

1. Install via [HACS](https://hacs.xyz/).
2. Add to resources if Home Assistant does not add it automatically:

```yaml
url: /hacsfiles/simple-thermostat/simple-thermostat.js
type: module
```

<details>
<summary>Manual install</summary>

1. Download `simple-thermostat.js` from the [latest release](https://github.com/Wheemer/simple-thermostat/releases/latest) and store it in your `configuration/www` folder.
2. Configure Lovelace to load the card:

```yaml
resources:
  - url: /local/simple-thermostat.js?v=1
    type: module
```

</details>

## Available configuration options

- `entity` _string_: The thermostat entity id. **Required**.
- `header` _false|Header object_: See [header config](#header-config).
- `setpoints` _false|Setpoints object_: See [setpoints config](#setpoints-config).
- `layout` _Layout object_:
  - `step` _row|column_: Where to render the setpoint up/down buttons.
  - `mode` _object_: Disable elements for all modes.
    - `names` _boolean_
    - `icons` _boolean_
    - `headings` _boolean_
  - `sensors` _object_:
    - `type` _list|table_: How to render sensors.
    - `labels` _boolean_: Whether to show labels/headings. Hiding labels here overrides root-level sensor label config.
- `service` _object_: Must specify both domain and service if overriding.
  - `domain` _string_: Override the service call domain.
  - `service` _string_: Override the service call name.
  - `data` _object_: Send extra data with the service call.
- `unit` _string|bool_: Override the unit to display. Set to `false` to hide the unit.
- `decimals` _number_: Number of decimals to use: `1` or `0`.
- `fallback` _string_: Text to display if a valid set point cannot be determined. Defaults to `N/A`.
- `step_size` _number_: Override the default `0.5` step size for increasing or decreasing the temperature.
- `label` _object_: Override untranslated labels.
  - `temperature` _string_: Override the temperature label.
  - `state` _string_: Override the state label.
- `hide` _object_: Control which information fields are shown.
  - `temperature` _boolean_: Defaults to `false`.
  - `state` _boolean_: Defaults to `false`.
- `control` _object|array_:
  - `hvac|fan|preset|swing|vane_horizontal|vane_vertical` _object|bool_: The mode type to control.
    - `_name` _string_: Override the mode type name.
    - `_hide_when_off` _boolean_: Hide the mode row when the entity is off. Defaults to `false`.
    - `_icons` _boolean_: Set to `false` to hide icons for this mode row only.
    - `{mode}` _string_: Name of the mode to control.
      - `name` _string|bool_: Specify a custom name or set to `false` to show only the icon.
      - `icon` _string|bool_: Specify a custom icon or set to `false` to hide the icon.
- `sensors` _array|false_:
  - `entity` _string_: A sensor entity id.
  - `name` _string_: Sensor name to use instead of the default friendly name.
  - `icon` _string_: Icon to use instead of a name.
  - `attribute` _string_: Attribute to use instead of state. If no entity is provided, the main entity's attributes are used.
  - `unit` _string_: Unit to display when using an attribute.
  - `decimals` _number_: Round numeric sensor values to a number of decimals.
  - `type` _relativetime_: Special data type for relative time rendering.

## Version 3 templated sensors

Version 3 enables templated sensor rows. This allows labels and values to be rendered from entity attributes, Home Assistant state, custom variables, and translated UI labels.

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
    show: false
```

When `version: 3` is enabled, the card adds built-in `state` and `temperature` rows unless you override them by using the same `id`.

Common fields:

- `id` _string_: Unique sensor id. Use `state` or `temperature` to override the built-in rows.
- `entity` _string_: Optional entity to use as the template context. Defaults to the main climate entity.
- `label` _string|false_: Sensor label. Set to `false` to hide the label.
- `template` _string_: Template used to render the sensor value.
- `show` _boolean_: Set to `false` to hide the row.

## Header config

Hiding the entire header is done with:

```yaml
header: false
```

If you pass an object, you can use any of the following keys.

Example:

```yaml
header:
  name: Overridden name
  icon: mdi:sofa
  toggle:
    entity: switch.light
    name: Light
  faults:
    - entity: switch.light
```

Full header config spec:

- `name` _string_: Override the card name. Defaults to the friendly name of the thermostat entity.
- `toggle` _object_: Entity to create a toggle in the header for. This gives the option to control a separate entity related to the thermostat entity, such as a switch or input boolean.
  - `entity` _string_: Entity id to control.
  - `name` _string|bool_: Label shown next to the toggle. Set to `true` to use the friendly name of the toggle entity.
- `faults` _array|false_: Show fault conditions as active/inactive icons in the header.
  - `entity` _string_: Binary sensor entity id.
  - `icon` _string_: Override the entity icon.
  - `hide_inactive` _boolean_: Hide the fault icon when inactive. Defaults to `false`.
- `icon` _string|object_: Show an icon next to the card name. Current value is taken from `attributes.hvac_action` when available, or state as fallback.
  - `auto` _string_: Use this icon for `hvac_action` auto. Default: `mdi:radiator`.
  - `cooling` _string_: Use this icon for `hvac_action` cooling. Default: `mdi:snowflake`.
  - `fan` _string_: Use this icon for `hvac_action` fan. Default: `mdi:fan`.
  - `heating` _string_: Use this icon for `hvac_action` heating. Default: `mdi:radiator`.
  - `idle` _string_: Use this icon for `hvac_action` idle. Default: `mdi:radiator-disabled`.
  - `"off"` _string_: Use this icon for `hvac_action` off. Default: `mdi:radiator-off`.
  - `auto` _string_: Use this icon for state auto. Default: `hass:autorenew`.
  - `cool` _string_: Use this icon for state cooling. Default: `hass:snowflake`.
  - `dry` _string_: Use this icon for state dry. Default: `hass:water-percent`.
  - `fan_only` _string_: Use this icon for state fan. Default: `hass:fan`.
  - `heat` _string_: Use this icon for state heat. Default: `hass:autorenew`.
  - `heat_cool` _string_: Use this icon for state heat_cool. Default: `hass:fire`.
  - `"off"` _string_: Use this icon for state off. Default: `hass:power`.

## Setpoints config

If you specify setpoints manually, include all setpoints you want shown.

Normally there are only two possibilities here: `temperature`, or `target_temp_high` plus `target_temp_low`. Single and dual thermostats are detected automatically, but climate devices with additional setpoints can be configured manually.

To use the `temperature` attribute as a setpoint:

```yaml
setpoints:
  temperature:
```

For dual thermostats:

```yaml
setpoints:
  target_temp_low:
  target_temp_high:
```

To hide one of the dual setpoints:

```yaml
setpoints:
  target_temp_low:
    hide: true
  target_temp_high:
```

For climate devices supporting more setpoints, include as many as needed. Automatic detection only works for the single and dual setpoint cases.

## Usage of the control config

The `control` config supports both a simple array format and a detailed object format. By default, with no config, the card shows `hvac` and `preset` controls if the entity supports them.

```yaml
control:
  - hvac
  - preset
```

For more control, use object format:

```yaml
control:
  preset:
    away: true
    none:
      name: Not set
```

There is no merging with the default config. If you want `hvac` controls too, include them explicitly:

```yaml
control:
  preset:
    away: true
    none:
      name: Not set
  hvac: true
```

Hide icons for only one mode row:

```yaml
control:
  fan:
    _icons: false
```

Quote `off` and `on` mode keys so YAML does not interpret them as booleans:

```yaml
control:
  hvac:
    "off":
      name: Off
    "on":
      name: On
```

For climate devices with horizontal and vertical vane controls (e.g. Mitsubishi AC units), enable them like any other mode type:

```yaml
control:
  hvac: true
  fan: true
  swing: true
  vane_horizontal: true
  vane_vertical: true
```

Custom names and filtered positions are also supported:

```yaml
control:
  vane_horizontal:
    _name: H-Vane
  vane_vertical:
    _name: V-Vane
```

## Example usage

```yaml
cards:
  - type: custom:simple-thermostat
    entity: climate.my_room
    step_size: 1
    sensors:
      - entity: sensor.fibaro_system_fgwpef_wall_plug_gen5_energy
      - entity: sensor.fibaro_system_fgwpef_wall_plug_gen5_power
        name: Energy today
      - attribute: min_temp
        name: Min temp
    header:
      faults:
        - entity: binary_sensor.my_room_communications_fault
        - entity: binary_sensor.my_room_low_battery_fault
          icon: mdi:battery-low
      toggle:
        entity: switch.pump_relay
    control:
      hvac:
        some_mode: false
        another_mode: false
        "off":
          name: Make it cold
          icon: false
        "on":
          name: false
          icon: mdi:snowflake
```

```yaml
cards:
  - type: custom:simple-thermostat
    entity: climate.my_room
    step_size: 1
    sensors:
      - entity: sensor.fibaro_system_fgwpef_wall_plug_gen5_energy
    header:
      toggle:
        entity: switch.pump_relay
        name: Control the pump
```

## CSS vars for theming

The card uses the following CSS variables:

| Var name                    | Default value                         | Usage                                                |
| --------------------------- | ------------------------------------- | ---------------------------------------------------- |
| --st-font-size-xl           | 24px                                  | Used for target temperature on wider viewports       |
| --st-font-size-l            | 20px                                  | Used for target temperature on smaller viewports     |
| --st-font-size-m            | var(--paper-font-title_-_font-size)   | Used for target temperature unit                     |
| --st-font-size-title        | var(--ha-card-header-font-size, 24px) | Font size for card heading                           |
| --st-font-size-sensors      | var(--paper-font-subhead_-_font-size) | Font size for sensors                                |
| --st-spacing                | 4px                                   | Base unit for spacing                                |
| --st-mode-active-background | var(--primary-color)                  | Background color for active mode button              |
| --st-mode-active-color      | var(--text-primary-color, #fff)       | Text color for active mode button                    |
| --st-mode-background        | #dff4fd                               | Background color for inactive mode button            |
| --st-toggle-label-color     | var(--text-primary-color)             | Text color for toggle label                          |
| --st-font-size-toggle-label | var(--paper-font-subhead_-_font-size) | Font size for toggle label                           |
| --st-fault-inactive-color   | var(--secondary-background-color)     | Icon color for inactive faults                       |
| --st-fault-active-color     | var(--accent-color)                   | Icon color for active faults                         |

### Target temperature sizing

The target temperature uses different variables depending on viewport width:

- `--st-font-size-l` controls the target temperature on smaller viewports.
- `--st-font-size-xl` controls the target temperature on wider viewports.
- `--st-font-size-m` controls the unit next to the target temperature.

To force a compact target temperature size on all screen widths, set both `--st-font-size-l` and `--st-font-size-xl`:

```yaml
type: custom:simple-thermostat
card_mod:
  style: |
    ha-card {
      --st-font-size-l: 10px;
      --st-font-size-xl: 10px;
      --st-font-size-m: 10px;
    }
```

These variables can be changed globally in the current theme or on each card via card-mod.

### Example using custom theme

Example that makes everything smaller and more compact except sensors, which are made larger.

```yaml
example-theme:
  st-font-size-xl: 24px
  st-font-size-l: 20px
  st-font-size-m: 20px
  st-font-size-title: 20px
  st-font-size-sensors: 30px
  st-spacing: 2px
```

### Example using card-mod

Same example as above, but applied to a single card.

```yaml
type: custom:simple-thermostat
card_mod:
  style: |
    ha-card {
      --st-font-size-xl: 24px;
      --st-font-size-l: 20px;
      --st-font-size-m: 20px;
      --st-font-size-title: 20px;
      --st-font-size-sensors: 30px;
      --st-spacing: 2px;
    }
```
