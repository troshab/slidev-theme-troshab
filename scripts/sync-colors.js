#!/usr/bin/env node
/**
 * Color Sync Script
 *
 * Reads colors from styles/colors.css (source of truth)
 * and generates:
 *   - setup/mermaid.ts
 *   - themes/puml-theme-troshab-dark.puml
 *   - themes/puml-theme-troshab-light.puml
 *
 * Usage: node scripts/sync-colors.js
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const COLORS_CSS = path.join(ROOT, 'styles/colors.css')
const MERMAID_TS = path.join(ROOT, 'setup/mermaid.ts')
const PUML_DARK = path.join(ROOT, 'themes/puml-theme-troshab-dark.puml')
const PUML_LIGHT = path.join(ROOT, 'themes/puml-theme-troshab-light.puml')

/**
 * Parse CSS file and extract color variables
 */
function parseColors(css) {
  const light = {}
  const dark = {}

  // Extract :root blocks (light theme)
  const rootMatches = css.match(/:root\s*\{[^}]+\}/g) || []
  rootMatches.forEach(block => {
    const vars = block.match(/--[\w-]+:\s*[^;]+/g) || []
    vars.forEach(v => {
      const [name, value] = v.split(':').map(s => s.trim())
      if (name.startsWith('--color-') || name.startsWith('--gradient-') || name.startsWith('--chart-')) {
        light[name] = value
      }
    })
  })

  // Extract all .dark blocks
  const darkMatches = css.match(/\.dark\s*\{[^}]+\}/g) || []
  darkMatches.forEach(block => {
    const vars = block.match(/--[\w-]+:\s*[^;]+/g) || []
    vars.forEach(v => {
      const [name, value] = v.split(':').map(s => s.trim())
      if (name.startsWith('--color-') || name.startsWith('--gradient-') || name.startsWith('--chart-')) {
        dark[name] = value
      }
    })
  })

  return { light, dark }
}

/**
 * Generate setup/mermaid.ts
 */
function generateMermaid(colors) {
  const { light, dark } = colors

  // Helper to get color or fallback
  const L = (name, fallback = '#000000') => light[name] || fallback
  const D = (name, fallback = '#FFFFFF') => dark[name] || light[name] || fallback

  return `import { defineMermaidSetup } from '@slidev/types'

/**
 * Mermaid theme configuration for slidev-theme-troshab
 *
 * AUTO-GENERATED from styles/colors.css
 * Run: node scripts/sync-colors.js
 *
 * Light theme: off-white backgrounds, blue accents
 * Dark theme: Dracula colors with cyan accents
 */
export default defineMermaidSetup(() => {
  const isDark = typeof document !== 'undefined'
    && document.documentElement.classList.contains('dark')

  const lightTheme = {
    theme: 'base',
    themeVariables: {
      // Background
      background: '${L('--color-bg')}',

      // Primary colors
      primaryColor: '${L('--color-primary-soft', '#E8F0FF')}',
      primaryTextColor: '${L('--color-text')}',
      primaryBorderColor: '${L('--color-primary')}',

      // Secondary
      secondaryColor: '${L('--color-bg-soft')}',
      secondaryTextColor: '${L('--color-text-secondary')}',
      secondaryBorderColor: '${L('--color-border')}',

      // Tertiary
      tertiaryColor: '${L('--color-bg-muted')}',
      tertiaryTextColor: '${L('--color-text-tertiary')}',
      tertiaryBorderColor: '${L('--color-border-strong')}',

      // Lines & arrows
      lineColor: '${L('--color-text-secondary')}',
      arrowheadColor: '${L('--color-text-secondary')}',

      // Text
      textColor: '${L('--color-text')}',

      // Nodes
      nodeBkg: '${L('--color-bg-soft')}',
      nodeBorder: '${L('--color-primary')}',
      nodeTextColor: '${L('--color-text')}',

      // Cluster
      mainBkg: '${L('--color-bg-soft')}',
      clusterBkg: '${L('--color-bg-muted')}',
      clusterBorder: '${L('--color-border-strong')}',

      // Notes
      noteBkgColor: '${L('--color-bg-soft')}',
      noteTextColor: '${L('--color-text')}',
      noteBorderColor: '${L('--color-border')}',

      // Sequence diagram
      actorBkg: '${L('--color-bg-soft')}',
      actorBorder: '${L('--color-primary')}',
      actorTextColor: '${L('--color-text')}',
      actorLineColor: '${L('--color-text-secondary')}',
      signalColor: '${L('--color-text-secondary')}',
      signalTextColor: '${L('--color-text')}',
      labelBoxBkgColor: '${L('--color-bg-muted')}',
      labelBoxBorderColor: '${L('--color-border')}',
      labelTextColor: '${L('--color-text')}',
      loopTextColor: '${L('--color-text-secondary')}',
      activationBkgColor: '${L('--color-primary-soft', '#E8F0FF')}',
      activationBorderColor: '${L('--color-primary')}',
      sequenceNumberColor: '${L('--color-bg')}',

      // State diagram
      labelColor: '${L('--color-text')}',

      // ER diagram
      attributeBackgroundColorOdd: '${L('--color-bg-soft')}',
      attributeBackgroundColorEven: '${L('--color-bg-muted')}',

      // Pie chart (12 colors from --chart-*)
      pie1: '${L('--chart-1')}',
      pie2: '${L('--chart-2')}',
      pie3: '${L('--chart-3')}',
      pie4: '${L('--chart-4')}',
      pie5: '${L('--chart-5')}',
      pie6: '${L('--chart-6')}',
      pie7: '${L('--chart-7')}',
      pie8: '${L('--chart-8')}',
      pie9: '${L('--chart-9')}',
      pie10: '${L('--chart-10')}',
      pie11: '${L('--chart-11')}',
      pie12: '${L('--chart-12')}',
      pieStrokeColor: '${L('--color-bg')}',
      pieStrokeWidth: '2px',
      pieTitleTextColor: '${L('--color-text')}',
      pieSectionTextColor: '${L('--color-bg')}',
      pieLegendTextColor: '${L('--color-text')}',
      pieOuterStrokeWidth: '2px',

      // XY Chart
      xyChart: {
        backgroundColor: 'transparent',
        titleColor: '${L('--color-text')}',
        xAxisTitleColor: '${L('--color-text-secondary')}',
        yAxisTitleColor: '${L('--color-text-secondary')}',
        xAxisLabelColor: '${L('--color-text-secondary')}',
        yAxisLabelColor: '${L('--color-text-secondary')}',
        xAxisTickColor: '${L('--color-border-strong')}',
        yAxisTickColor: '${L('--color-border-strong')}',
        xAxisLineColor: '${L('--color-border-strong')}',
        yAxisLineColor: '${L('--color-border-strong')}',
        plotColorPalette: '${L('--chart-1')},${L('--chart-2')},${L('--chart-3')},${L('--chart-4')},${L('--chart-5')},${L('--chart-6')}',
      },

      // Git Graph
      git0: '${L('--chart-1')}',
      git1: '${L('--chart-2')}',
      git2: '${L('--chart-3')}',
      git3: '${L('--chart-4')}',
      git4: '${L('--chart-5')}',
      git5: '${L('--chart-6')}',
      git6: '${L('--chart-7')}',
      git7: '${L('--chart-8')}',
      gitBranchLabel0: '${L('--color-bg')}',
      gitBranchLabel1: '${L('--color-bg')}',
      gitBranchLabel2: '${L('--color-bg')}',
      gitBranchLabel3: '${L('--color-text')}',
      gitBranchLabel4: '${L('--color-bg')}',
      gitBranchLabel5: '${L('--color-bg')}',
      gitBranchLabel6: '${L('--color-bg')}',
      gitBranchLabel7: '${L('--color-text')}',
      commitLabelColor: '${L('--color-text')}',
      commitLabelBackground: '${L('--color-bg-muted')}',
      commitLabelFontSize: '12px',
      tagLabelColor: '${L('--color-text')}',
      tagLabelBackground: '${L('--color-bg-soft')}',
      tagLabelBorder: '${L('--color-border-strong')}',
      tagLabelFontSize: '12px',

      // Timeline
      cScale0: '${L('--chart-1')}',
      cScale1: '${L('--chart-2')}',
      cScale2: '${L('--chart-3')}',
      cScale3: '${L('--chart-4')}',
      cScale4: '${L('--chart-5')}',
      cScale5: '${L('--chart-6')}',
      cScaleLabel0: '${L('--color-bg')}',
      cScaleLabel1: '${L('--color-bg')}',
      cScaleLabel2: '${L('--color-bg')}',
      cScaleLabel3: '${L('--color-text')}',
      cScaleLabel4: '${L('--color-bg')}',
      cScaleLabel5: '${L('--color-bg')}',

      // Mindmap
      mindmapNode: '${L('--color-bg-soft')}',
      mindmapNodeBorder: '${L('--color-primary')}',
      mindmapNodeText: '${L('--color-text')}',

      // Gantt
      sectionBkgColor: 'transparent',
      sectionBkgColor2: 'transparent',
      altSectionBkgColor: 'transparent',
      gridColor: '${L('--color-border-strong')}',
      doneTaskBkgColor: '${L('--color-success')}',
      doneTaskBorderColor: '${L('--color-success')}',
      activeTaskBkgColor: '${L('--color-primary')}',
      activeTaskBorderColor: '${L('--color-primary')}',
      critBkgColor: '${L('--color-danger')}',
      critBorderColor: '${L('--color-danger')}',
      taskBkgColor: '${L('--color-bg-soft')}',
      taskBorderColor: '${L('--color-border-strong')}',
      taskTextColor: '${L('--color-text')}',
      taskTextDarkColor: '${L('--color-text')}',
      taskTextLightColor: '${L('--color-bg')}',
      todayLineColor: '${L('--color-danger')}',

      // Fonts
      fontFamily: 'IBM Plex Sans, sans-serif',
    }
  }

  const darkTheme = {
    theme: 'base',
    themeVariables: {
      // Background
      background: '${D('--color-bg')}',

      // Primary colors
      primaryColor: '${D('--color-bg-muted')}',
      primaryTextColor: '${D('--color-text')}',
      primaryBorderColor: '${D('--color-primary')}',

      // Secondary
      secondaryColor: '${D('--color-bg-soft')}',
      secondaryTextColor: '${D('--color-text-secondary')}',
      secondaryBorderColor: '${D('--color-bg-muted')}',

      // Tertiary
      tertiaryColor: '${D('--color-bg-muted')}',
      tertiaryTextColor: '${D('--color-text-tertiary')}',
      tertiaryBorderColor: '${D('--color-border-strong')}',

      // Lines & arrows
      lineColor: '${D('--color-text-secondary')}',
      arrowheadColor: '${D('--color-text-secondary')}',

      // Text
      textColor: '${D('--color-text')}',

      // Nodes
      nodeBkg: '${D('--color-bg-soft')}',
      nodeBorder: '${D('--color-primary')}',
      nodeTextColor: '${D('--color-text')}',

      // Cluster
      mainBkg: '${D('--color-bg-soft')}',
      clusterBkg: '${D('--color-bg-muted')}',
      clusterBorder: '${D('--color-border-strong')}',

      // Notes
      noteBkgColor: '${D('--color-bg-soft')}',
      noteTextColor: '${D('--color-text')}',
      noteBorderColor: '${D('--color-bg-muted')}',

      // Sequence diagram
      actorBkg: '${D('--color-bg-soft')}',
      actorBorder: '${D('--color-primary')}',
      actorTextColor: '${D('--color-text')}',
      actorLineColor: '${D('--color-text-secondary')}',
      signalColor: '${D('--color-text-secondary')}',
      signalTextColor: '${D('--color-text')}',
      labelBoxBkgColor: '${D('--color-bg-muted')}',
      labelBoxBorderColor: '${D('--color-border-strong')}',
      labelTextColor: '${D('--color-text')}',
      loopTextColor: '${D('--color-text-secondary')}',
      activationBkgColor: '${D('--color-bg-muted')}',
      activationBorderColor: '${D('--color-primary')}',
      sequenceNumberColor: '${D('--color-bg')}',

      // State diagram
      labelColor: '${D('--color-text')}',

      // ER diagram
      attributeBackgroundColorOdd: '${D('--color-bg-soft')}',
      attributeBackgroundColorEven: '${D('--color-bg-muted')}',

      // Pie chart (12 colors from --chart-*)
      pie1: '${D('--chart-1')}',
      pie2: '${D('--chart-2')}',
      pie3: '${D('--chart-3')}',
      pie4: '${D('--chart-4')}',
      pie5: '${D('--chart-5')}',
      pie6: '${D('--chart-6')}',
      pie7: '${D('--chart-7')}',
      pie8: '${D('--chart-8')}',
      pie9: '${D('--chart-9')}',
      pie10: '${D('--chart-10')}',
      pie11: '${D('--chart-11')}',
      pie12: '${D('--chart-12')}',
      pieStrokeColor: '${D('--color-bg')}',
      pieStrokeWidth: '2px',
      pieTitleTextColor: '${D('--color-text')}',
      pieSectionTextColor: '${D('--color-bg')}',
      pieLegendTextColor: '${D('--color-text')}',
      pieOuterStrokeWidth: '2px',

      // XY Chart
      xyChart: {
        backgroundColor: 'transparent',
        titleColor: '${D('--color-text')}',
        xAxisTitleColor: '${D('--color-text-secondary')}',
        yAxisTitleColor: '${D('--color-text-secondary')}',
        xAxisLabelColor: '${D('--color-text-secondary')}',
        yAxisLabelColor: '${D('--color-text-secondary')}',
        xAxisTickColor: '${D('--color-border-strong')}',
        yAxisTickColor: '${D('--color-border-strong')}',
        xAxisLineColor: '${D('--color-border-strong')}',
        yAxisLineColor: '${D('--color-border-strong')}',
        plotColorPalette: '${D('--chart-1')},${D('--chart-2')},${D('--chart-3')},${D('--chart-4')},${D('--chart-5')},${D('--chart-6')}',
      },

      // Git Graph
      git0: '${D('--chart-1')}',
      git1: '${D('--chart-2')}',
      git2: '${D('--chart-3')}',
      git3: '${D('--chart-4')}',
      git4: '${D('--chart-5')}',
      git5: '${D('--chart-6')}',
      git6: '${D('--chart-7')}',
      git7: '${D('--chart-8')}',
      gitBranchLabel0: '${D('--color-bg')}',
      gitBranchLabel1: '${D('--color-bg')}',
      gitBranchLabel2: '${D('--color-bg')}',
      gitBranchLabel3: '${D('--color-bg')}',
      gitBranchLabel4: '${D('--color-bg')}',
      gitBranchLabel5: '${D('--color-bg')}',
      gitBranchLabel6: '${D('--color-text')}',
      gitBranchLabel7: '${D('--color-text')}',
      commitLabelColor: '${D('--color-text')}',
      commitLabelBackground: '${D('--color-bg-muted')}',
      commitLabelFontSize: '12px',
      tagLabelColor: '${D('--color-text')}',
      tagLabelBackground: '${D('--color-bg-soft')}',
      tagLabelBorder: '${D('--color-border-strong')}',
      tagLabelFontSize: '12px',

      // Timeline
      cScale0: '${D('--chart-1')}',
      cScale1: '${D('--chart-2')}',
      cScale2: '${D('--chart-3')}',
      cScale3: '${D('--chart-4')}',
      cScale4: '${D('--chart-5')}',
      cScale5: '${D('--chart-6')}',
      cScaleLabel0: '${D('--color-bg')}',
      cScaleLabel1: '${D('--color-bg')}',
      cScaleLabel2: '${D('--color-bg')}',
      cScaleLabel3: '${D('--color-bg')}',
      cScaleLabel4: '${D('--color-bg')}',
      cScaleLabel5: '${D('--color-bg')}',

      // Mindmap
      mindmapNode: '${D('--color-bg-soft')}',
      mindmapNodeBorder: '${D('--color-primary')}',
      mindmapNodeText: '${D('--color-text')}',

      // Gantt
      sectionBkgColor: 'transparent',
      sectionBkgColor2: 'transparent',
      altSectionBkgColor: 'transparent',
      gridColor: '${D('--color-border-strong')}',
      doneTaskBkgColor: '${D('--color-success')}',
      doneTaskBorderColor: '${D('--color-success')}',
      activeTaskBkgColor: '${D('--color-primary')}',
      activeTaskBorderColor: '${D('--color-primary')}',
      critBkgColor: '${D('--color-danger')}',
      critBorderColor: '${D('--color-danger')}',
      taskBkgColor: '${D('--color-bg-soft')}',
      taskBorderColor: '${D('--color-border-strong')}',
      taskTextColor: '${D('--color-text')}',
      taskTextDarkColor: '${D('--color-bg')}',
      taskTextLightColor: '${D('--color-text')}',
      todayLineColor: '${D('--color-danger')}',

      // Fonts
      fontFamily: 'IBM Plex Sans, sans-serif',
    }
  }

  return isDark ? darkTheme : lightTheme
})
`
}

/**
 * Generate PlantUML theme file
 */
function generatePuml(colors, isDark) {
  const c = isDark ? colors.dark : colors.light
  const themeName = isDark ? 'troshab-dark' : 'troshab-light'

  // Helper to get color (dark falls back to light)
  const get = (name, fallback) => {
    if (isDark) {
      return c[name] || colors.light[name] || fallback
    }
    return colors.light[name] || fallback
  }

  const bg = get('--color-bg', isDark ? '#282A36' : '#FAFAFA')
  const bgSoft = get('--color-bg-soft', isDark ? '#343746' : '#F5F5F0')
  const bgMuted = get('--color-bg-muted', isDark ? '#44475A' : '#EEEEE8')
  const text = get('--color-text', isDark ? '#F8F8F2' : '#1F1F1F')
  const textSecondary = get('--color-text-secondary', isDark ? '#A1AACB' : '#4A4A5A')
  const textTertiary = get('--color-text-tertiary', isDark ? '#8890A8' : '#6B6B7A')
  const border = get('--color-border', isDark ? '#44475A' : '#E0E0D8')
  const borderStrong = get('--color-border-strong', isDark ? '#6272A4' : '#C0C0B8')
  const primary = get('--color-primary', isDark ? '#8BE9FD' : '#0B5FFF')
  const success = get('--color-success', isDark ? '#50FA7B' : '#0F7B3E')
  const warning = get('--color-warning', isDark ? '#FFB86C' : '#B45309')
  const danger = get('--color-danger', isDark ? '#FF5555' : '#B42318')
  const info = get('--color-info', isDark ? '#8BE9FD' : '#036A96')

  return `''
'' Troshab ${isDark ? 'Dark' : 'Light'} Theme for PlantUML
'' ${isDark ? 'Dracula-inspired colors' : 'Clean light theme'} for slidev-theme-troshab
''
'' AUTO-GENERATED from styles/colors.css
'' Run: node scripts/sync-colors.js
''
'' Usage (after repo is published):
''   @startuml
''   !theme ${themeName} from https://raw.githubusercontent.com/troshab/slidev-theme-troshab/master/themes
''   ...
''   @enduml
''

!$THEME = "${themeName}"

!if %not(%variable_exists("$BGCOLOR"))
!$BGCOLOR = "${bg}"
!endif

skinparam backgroundColor $BGCOLOR
skinparam useBetaStyle false

'' ==========================================
'' Color Palette (from colors.css)
'' ==========================================
!$BACKGROUND      = "${bg}"
!$BG_SOFT         = "${bgSoft}"
!$BG_MUTED        = "${bgMuted}"
!$TEXT            = "${text}"
!$TEXT_SECONDARY  = "${textSecondary}"
!$TEXT_TERTIARY   = "${textTertiary}"
!$BORDER          = "${border}"
!$BORDER_STRONG   = "${borderStrong}"
!$PRIMARY         = "${primary}"
!$SUCCESS         = "${success}"
!$WARNING         = "${warning}"
!$DANGER          = "${danger}"
!$INFO            = "${info}"

'' ==========================================
'' Global Settings
'' ==========================================
skinparam defaultFontName       "IBM Plex Sans"
skinparam defaultFontSize       14
skinparam defaultFontColor      $TEXT
skinparam dpi                   100
skinparam shadowing             false
skinparam roundCorner           8
skinparam wrapWidth             200

'' ==========================================
'' Arrows
'' ==========================================
skinparam ArrowColor            $TEXT_SECONDARY
skinparam ArrowFontColor        $TEXT_SECONDARY
skinparam ArrowFontName         "IBM Plex Sans"
skinparam ArrowFontSize         12
skinparam ArrowThickness        1.5

'' ==========================================
'' Sequence Diagram
'' ==========================================
skinparam sequence {
    ArrowColor          $TEXT_SECONDARY
    ArrowFontColor      $TEXT_SECONDARY
    ArrowFontSize       12
    ArrowThickness      1.5

    ActorBorderColor    $PRIMARY
    ActorBackgroundColor $BG_SOFT
    ActorFontColor      $TEXT
    ActorFontSize       14
    ActorFontStyle      bold

    LifeLineBorderColor $BORDER_STRONG
    LifeLineBackgroundColor $BG_MUTED

    ParticipantBorderColor   $PRIMARY
    ParticipantBackgroundColor $BG_SOFT
    ParticipantFontColor     $TEXT
    ParticipantFontSize      14
    ParticipantFontStyle     bold
    ParticipantPadding       20

    BoxBorderColor      $BORDER_STRONG
    BoxBackgroundColor  $BACKGROUND
    BoxFontColor        $TEXT

    DividerBorderColor  $BORDER_STRONG
    DividerBackgroundColor $BG_MUTED
    DividerFontColor    $TEXT

    GroupBorderColor    $BORDER_STRONG
    GroupBackgroundColor $BACKGROUND
    GroupFontColor      $TEXT
    GroupHeaderFontColor $TEXT

    ReferenceBackgroundColor $BG_MUTED
    ReferenceBorderColor $BORDER_STRONG
    ReferenceFontColor  $TEXT

    DelayFontColor      $TEXT_TERTIARY
}

'' ==========================================
'' Class Diagram
'' ==========================================
skinparam class {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
    FontSize            14

    ArrowColor          $TEXT_SECONDARY
    ArrowFontColor      $TEXT_SECONDARY

    AttributeFontColor  $TEXT
    AttributeFontSize   12
    AttributeIconSize   0

    StereotypeFontColor $TEXT_TERTIARY
    StereotypeFontSize  11

    HeaderBackgroundColor $BG_MUTED
}

'' ==========================================
'' Object Diagram
'' ==========================================
skinparam object {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
    FontSize            14
    ArrowColor          $TEXT_SECONDARY
    AttributeFontColor  $TEXT
}

'' ==========================================
'' Component Diagram
'' ==========================================
skinparam component {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
    FontSize            14
    ArrowColor          $TEXT_SECONDARY

    InterfaceBackgroundColor $BG_SOFT
    InterfaceBorderColor $PRIMARY
}

'' ==========================================
'' Package
'' ==========================================
skinparam package {
    BackgroundColor     $BACKGROUND
    BorderColor         $BORDER_STRONG
    BorderThickness     2
    FontColor           $TEXT
    FontSize            14
    FontStyle           bold

    StereotypeFontColor $TEXT_TERTIARY
}

'' ==========================================
'' Activity Diagram
'' ==========================================
skinparam activity {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
    FontSize            14

    ArrowColor          $TEXT_SECONDARY
    ArrowFontColor      $TEXT_SECONDARY

    StartColor          $SUCCESS
    EndColor            $DANGER
    BarColor            $BORDER_STRONG

    DiamondBackgroundColor $BG_MUTED
    DiamondBorderColor  $WARNING
    DiamondFontColor    $TEXT
}

'' ==========================================
'' State Diagram
'' ==========================================
skinparam state {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
    FontSize            14

    ArrowColor          $TEXT_SECONDARY
    ArrowFontColor      $TEXT_SECONDARY

    StartColor          $SUCCESS
    EndColor            $DANGER
}

'' ==========================================
'' Use Case Diagram
'' ==========================================
skinparam usecase {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
    FontSize            14

    ArrowColor          $TEXT_SECONDARY

    ActorBackgroundColor $BG_SOFT
    ActorBorderColor    $PRIMARY
    ActorFontColor      $TEXT
}

'' ==========================================
'' Note
'' ==========================================
skinparam note {
    BackgroundColor     $BG_MUTED
    BorderColor         $BORDER_STRONG
    BorderThickness     1
    FontColor           $TEXT
    FontSize            12
}

'' ==========================================
'' Legend
'' ==========================================
skinparam legend {
    BackgroundColor     $BG_SOFT
    BorderColor         $BORDER_STRONG
    BorderThickness     1
    FontColor           $TEXT
    FontSize            12
}

'' ==========================================
'' Card / Rectangle / Entity
'' ==========================================
skinparam card {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
}

skinparam rectangle {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
    StereotypeFontColor $TEXT_TERTIARY
}

skinparam entity {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    FontColor           $TEXT
}

'' ==========================================
'' Database / Storage / Cloud / Queue
'' ==========================================
skinparam database {
    BackgroundColor     $BG_SOFT
    BorderColor         $INFO
    BorderThickness     2
    FontColor           $TEXT
}

skinparam storage {
    BackgroundColor     $BG_SOFT
    BorderColor         $INFO
    BorderThickness     2
    FontColor           $TEXT
}

skinparam cloud {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    BorderThickness     2
    FontColor           $TEXT
}

skinparam queue {
    BackgroundColor     $BG_SOFT
    BorderColor         $WARNING
    BorderThickness     2
    FontColor           $TEXT
}

'' ==========================================
'' Agent / Actor / Boundary / Control
'' ==========================================
skinparam agent {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    FontColor           $TEXT
}

skinparam actor {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    FontColor           $TEXT
}

skinparam boundary {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    FontColor           $TEXT
}

skinparam control {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    FontColor           $TEXT
}

'' ==========================================
'' Mind Map / WBS / Timing / Gantt
'' ==========================================
skinparam mindmap {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    FontColor           $TEXT
}

skinparam wbs {
    BackgroundColor     $BG_SOFT
    BorderColor         $PRIMARY
    FontColor           $TEXT
}

skinparam timing {
    ArrowColor          $TEXT_SECONDARY
    FontColor           $TEXT
}

skinparam gantt {
    BackgroundColor     $BACKGROUND
    FontColor           $TEXT
}
`
}

// Main
function main() {
  console.log('Reading colors from styles/colors.css...')

  const css = fs.readFileSync(COLORS_CSS, 'utf-8')
  const colors = parseColors(css)

  console.log(`  Found ${Object.keys(colors.light).length} light theme colors`)
  console.log(`  Found ${Object.keys(colors.dark).length} dark theme colors`)

  // Generate files
  console.log('\nGenerating files...')

  // Mermaid
  fs.mkdirSync(path.dirname(MERMAID_TS), { recursive: true })
  fs.writeFileSync(MERMAID_TS, generateMermaid(colors))
  console.log('  ✓ setup/mermaid.ts')

  // PlantUML
  fs.mkdirSync(path.dirname(PUML_DARK), { recursive: true })
  fs.writeFileSync(PUML_DARK, generatePuml(colors, true))
  console.log('  ✓ themes/puml-theme-troshab-dark.puml')

  fs.writeFileSync(PUML_LIGHT, generatePuml(colors, false))
  console.log('  ✓ themes/puml-theme-troshab-light.puml')

  console.log('\nDone! Colors synced from CSS to Mermaid and PlantUML.')
}

main()
