import { defineMermaidSetup } from '@slidev/types'

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
      background: '#FAFAFA',

      // Primary colors
      primaryColor: '#E8F0FF',
      primaryTextColor: '#1F1F1F',
      primaryBorderColor: '#0B5FFF',

      // Secondary
      secondaryColor: '#F5F5F0',
      secondaryTextColor: '#4A4A5A',
      secondaryBorderColor: '#E0E0D8',

      // Tertiary
      tertiaryColor: '#EEEEE8',
      tertiaryTextColor: '#6B6B7A',
      tertiaryBorderColor: '#C0C0B8',

      // Lines & arrows
      lineColor: '#4A4A5A',
      arrowheadColor: '#4A4A5A',

      // Text
      textColor: '#1F1F1F',

      // Nodes
      nodeBkg: '#F5F5F0',
      nodeBorder: '#0B5FFF',
      nodeTextColor: '#1F1F1F',

      // Cluster
      mainBkg: '#F5F5F0',
      clusterBkg: '#EEEEE8',
      clusterBorder: '#C0C0B8',

      // Notes
      noteBkgColor: '#F5F5F0',
      noteTextColor: '#1F1F1F',
      noteBorderColor: '#E0E0D8',

      // Sequence diagram
      actorBkg: '#F5F5F0',
      actorBorder: '#0B5FFF',
      actorTextColor: '#1F1F1F',
      actorLineColor: '#4A4A5A',
      signalColor: '#4A4A5A',
      signalTextColor: '#1F1F1F',
      labelBoxBkgColor: '#EEEEE8',
      labelBoxBorderColor: '#E0E0D8',
      labelTextColor: '#1F1F1F',
      loopTextColor: '#4A4A5A',
      activationBkgColor: '#E8F0FF',
      activationBorderColor: '#0B5FFF',
      sequenceNumberColor: '#FAFAFA',

      // State diagram
      labelColor: '#1F1F1F',

      // ER diagram
      attributeBackgroundColorOdd: '#F5F5F0',
      attributeBackgroundColorEven: '#EEEEE8',

      // Pie chart (12 colors from --chart-*)
      pie1: '#0B5FFF',
      pie2: '#0F7B3E',
      pie3: '#B45309',
      pie4: '#036A96',
      pie5: '#9333EA',
      pie6: '#B42318',
      pie7: '#0891B2',
      pie8: '#CA8A04',
      pie9: '#4F46E5',
      pie10: '#059669',
      pie11: '#DC2626',
      pie12: '#7C3AED',
      pieStrokeColor: '#FAFAFA',
      pieStrokeWidth: '2px',
      pieTitleTextColor: '#1F1F1F',
      pieSectionTextColor: '#FAFAFA',
      pieLegendTextColor: '#1F1F1F',
      pieOuterStrokeWidth: '2px',

      // XY Chart
      xyChart: {
        backgroundColor: 'transparent',
        titleColor: '#1F1F1F',
        xAxisTitleColor: '#4A4A5A',
        yAxisTitleColor: '#4A4A5A',
        xAxisLabelColor: '#4A4A5A',
        yAxisLabelColor: '#4A4A5A',
        xAxisTickColor: '#C0C0B8',
        yAxisTickColor: '#C0C0B8',
        xAxisLineColor: '#C0C0B8',
        yAxisLineColor: '#C0C0B8',
        plotColorPalette: '#0B5FFF,#0F7B3E,#B45309,#036A96,#9333EA,#B42318',
      },

      // Git Graph
      git0: '#0B5FFF',
      git1: '#0F7B3E',
      git2: '#B45309',
      git3: '#036A96',
      git4: '#9333EA',
      git5: '#B42318',
      git6: '#0891B2',
      git7: '#CA8A04',
      gitBranchLabel0: '#FAFAFA',
      gitBranchLabel1: '#FAFAFA',
      gitBranchLabel2: '#FAFAFA',
      gitBranchLabel3: '#1F1F1F',
      gitBranchLabel4: '#FAFAFA',
      gitBranchLabel5: '#FAFAFA',
      gitBranchLabel6: '#FAFAFA',
      gitBranchLabel7: '#1F1F1F',
      commitLabelColor: '#1F1F1F',
      commitLabelBackground: '#EEEEE8',
      commitLabelFontSize: '12px',
      tagLabelColor: '#1F1F1F',
      tagLabelBackground: '#F5F5F0',
      tagLabelBorder: '#C0C0B8',
      tagLabelFontSize: '12px',

      // Timeline
      cScale0: '#0B5FFF',
      cScale1: '#0F7B3E',
      cScale2: '#B45309',
      cScale3: '#036A96',
      cScale4: '#9333EA',
      cScale5: '#B42318',
      cScaleLabel0: '#FAFAFA',
      cScaleLabel1: '#FAFAFA',
      cScaleLabel2: '#FAFAFA',
      cScaleLabel3: '#1F1F1F',
      cScaleLabel4: '#FAFAFA',
      cScaleLabel5: '#FAFAFA',

      // Mindmap
      mindmapNode: '#F5F5F0',
      mindmapNodeBorder: '#0B5FFF',
      mindmapNodeText: '#1F1F1F',

      // Gantt
      sectionBkgColor: 'transparent',
      sectionBkgColor2: 'transparent',
      altSectionBkgColor: 'transparent',
      gridColor: '#C0C0B8',
      doneTaskBkgColor: '#0F7B3E',
      doneTaskBorderColor: '#0F7B3E',
      activeTaskBkgColor: '#0B5FFF',
      activeTaskBorderColor: '#0B5FFF',
      critBkgColor: '#B42318',
      critBorderColor: '#B42318',
      taskBkgColor: '#F5F5F0',
      taskBorderColor: '#C0C0B8',
      taskTextColor: '#1F1F1F',
      taskTextDarkColor: '#1F1F1F',
      taskTextLightColor: '#FAFAFA',
      todayLineColor: '#B42318',

      // Fonts
      fontFamily: 'Arial, Arial',
    }
  }

  const darkTheme = {
    theme: 'base',
    themeVariables: {
      // Background
      background: '#282A36',

      // Primary colors
      primaryColor: '#44475A',
      primaryTextColor: '#F8F8F2',
      primaryBorderColor: '#8BE9FD',

      // Secondary
      secondaryColor: '#343746',
      secondaryTextColor: '#A1AACB',
      secondaryBorderColor: '#44475A',

      // Tertiary
      tertiaryColor: '#44475A',
      tertiaryTextColor: '#8890A8',
      tertiaryBorderColor: '#6272A4',

      // Lines & arrows
      lineColor: '#A1AACB',
      arrowheadColor: '#A1AACB',

      // Text
      textColor: '#F8F8F2',

      // Nodes
      nodeBkg: '#343746',
      nodeBorder: '#8BE9FD',
      nodeTextColor: '#F8F8F2',

      // Cluster
      mainBkg: '#343746',
      clusterBkg: '#44475A',
      clusterBorder: '#6272A4',

      // Notes
      noteBkgColor: '#343746',
      noteTextColor: '#F8F8F2',
      noteBorderColor: '#44475A',

      // Sequence diagram
      actorBkg: '#343746',
      actorBorder: '#8BE9FD',
      actorTextColor: '#F8F8F2',
      actorLineColor: '#A1AACB',
      signalColor: '#A1AACB',
      signalTextColor: '#F8F8F2',
      labelBoxBkgColor: '#44475A',
      labelBoxBorderColor: '#6272A4',
      labelTextColor: '#F8F8F2',
      loopTextColor: '#A1AACB',
      activationBkgColor: '#44475A',
      activationBorderColor: '#8BE9FD',
      sequenceNumberColor: '#282A36',

      // State diagram
      labelColor: '#F8F8F2',

      // ER diagram
      attributeBackgroundColorOdd: '#343746',
      attributeBackgroundColorEven: '#44475A',

      // Pie chart (12 colors from --chart-*)
      pie1: '#8BE9FD',
      pie2: '#50FA7B',
      pie3: '#FFB86C',
      pie4: '#BD93F9',
      pie5: '#FF5555',
      pie6: '#FF79C6',
      pie7: '#F1FA8C',
      pie8: '#6272A4',
      pie9: '#44D7B6',
      pie10: '#FF6E6E',
      pie11: '#CAA9FA',
      pie12: '#69FF94',
      pieStrokeColor: '#282A36',
      pieStrokeWidth: '2px',
      pieTitleTextColor: '#F8F8F2',
      pieSectionTextColor: '#282A36',
      pieLegendTextColor: '#F8F8F2',
      pieOuterStrokeWidth: '2px',

      // XY Chart
      xyChart: {
        backgroundColor: 'transparent',
        titleColor: '#F8F8F2',
        xAxisTitleColor: '#A1AACB',
        yAxisTitleColor: '#A1AACB',
        xAxisLabelColor: '#A1AACB',
        yAxisLabelColor: '#A1AACB',
        xAxisTickColor: '#6272A4',
        yAxisTickColor: '#6272A4',
        xAxisLineColor: '#6272A4',
        yAxisLineColor: '#6272A4',
        plotColorPalette: '#8BE9FD,#50FA7B,#FFB86C,#BD93F9,#FF5555,#FF79C6',
      },

      // Git Graph
      git0: '#8BE9FD',
      git1: '#50FA7B',
      git2: '#FFB86C',
      git3: '#BD93F9',
      git4: '#FF5555',
      git5: '#FF79C6',
      git6: '#F1FA8C',
      git7: '#6272A4',
      gitBranchLabel0: '#282A36',
      gitBranchLabel1: '#282A36',
      gitBranchLabel2: '#282A36',
      gitBranchLabel3: '#282A36',
      gitBranchLabel4: '#282A36',
      gitBranchLabel5: '#282A36',
      gitBranchLabel6: '#F8F8F2',
      gitBranchLabel7: '#F8F8F2',
      commitLabelColor: '#F8F8F2',
      commitLabelBackground: '#44475A',
      commitLabelFontSize: '12px',
      tagLabelColor: '#F8F8F2',
      tagLabelBackground: '#343746',
      tagLabelBorder: '#6272A4',
      tagLabelFontSize: '12px',

      // Timeline
      cScale0: '#8BE9FD',
      cScale1: '#50FA7B',
      cScale2: '#FFB86C',
      cScale3: '#BD93F9',
      cScale4: '#FF5555',
      cScale5: '#FF79C6',
      cScaleLabel0: '#282A36',
      cScaleLabel1: '#282A36',
      cScaleLabel2: '#282A36',
      cScaleLabel3: '#282A36',
      cScaleLabel4: '#282A36',
      cScaleLabel5: '#282A36',

      // Mindmap
      mindmapNode: '#343746',
      mindmapNodeBorder: '#8BE9FD',
      mindmapNodeText: '#F8F8F2',

      // Gantt
      sectionBkgColor: 'transparent',
      sectionBkgColor2: 'transparent',
      altSectionBkgColor: 'transparent',
      gridColor: '#6272A4',
      doneTaskBkgColor: '#50FA7B',
      doneTaskBorderColor: '#50FA7B',
      activeTaskBkgColor: '#8BE9FD',
      activeTaskBorderColor: '#8BE9FD',
      critBkgColor: '#FF5555',
      critBorderColor: '#FF5555',
      taskBkgColor: '#343746',
      taskBorderColor: '#6272A4',
      taskTextColor: '#F8F8F2',
      taskTextDarkColor: '#282A36',
      taskTextLightColor: '#F8F8F2',
      todayLineColor: '#FF5555',

      // Fonts
      fontFamily: 'Arial, Arial',
    }
  }

  return isDark ? darkTheme : lightTheme
})
