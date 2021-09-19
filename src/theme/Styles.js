import Colors from './Colors';
import Fonts from './Fonts';
import Metrics from './Metrics';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  main: {
    backgroundColor: Colors.background
  },
  sectionContainer: {
    paddingHorizontal: Metrics.paddingDefault,
    paddingTop: Metrics.paddingDefault
  },
  section: {
    marginBottom: Metrics.paddingDefault,
    padding: Metrics.paddingDefault,
    backgroundColor: Colors.sectionBackground
  },
  alignItemsCenter: {
    alignItems: 'center'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.paddingDefault
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  textCenter: {
    textAlign: 'center'
  },
  textBold: {
    fontWeight: 'bold'
  },

  // Drawer
  drawer: {
    drawer: {
      backgroundColor: Colors.drawerBackground,
      shadowColor: Colors.drawerShadow,
      shadowOpacity: 0.4,
      shadowOffset: { width: 1, height: 1 }
    }
  },

  drawerItem: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.paddingDefault,
    paddingVertical: Metrics.paddingDefault * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: Metrics.borderWidthDefault,
    borderBottomColor: Colors.drawerBorder
  },
  drawerItemContent: {
    flex: 1,
    justifyContent: 'center',
    minHeight: Metrics.iconSmall
  },
  drawerItemHighlight: {
    backgroundColor: Colors.drawerBackgroundHighlight
  },

  drawerItemIcon: {
    width: Metrics.iconSmall,
    height: Metrics.iconSmall,
    marginRight: Metrics.marginDefault
  },
  drawerItemTextHighlight: {
    color: Colors.drawerTextHighlight
  },
  drawerItemTitle: {
    fontSize: Fonts.size.h6
  },
  drawerItemDescription: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  drawerItemDescriptionIcon: {
    width: Fonts.size.tiny,
    height: Fonts.size.tiny,
    borderRadius: Fonts.size.tiny,
    marginRight: Metrics.marginDefault / 2
  },
  drawerItemDescriptionText: {
    color: Colors.drawerTextMuted,
    fontSize: Fonts.size.tiny
  },
  drawerItemDescriptionTextHighlight: {
    color: Colors.drawerTextMutedHighlight,
    fontSize: Fonts.size.tiny
  },
  drawerItemText: {
    color: Colors.drawerText
  },

  drawerItemCollapsable: {
    fontSize: Fonts.size.default
  },

  // Banner
  banner: {
    width: 320,
    height: 50
  },

  bannerContainer: {
    alignItems: 'center',
    backgroundColor: Colors.bannerBackground
  },

  // HTML Styles
  html: {
    div: {
      color: Colors.textDefault
    },
    p: {
      color: Colors.textDefault
    },
    strong: {
      color: Colors.textMuted,
      fontWeight: 'bold'
    },
    b: {
      color: Colors.textMuted,
      fontWeight: 'bold'
    }
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.tableHeaderBackground
  },
  tableHeaderCell: {
    paddingHorizontal: Metrics.paddingDefault / 2,
    paddingVertical: Metrics.paddingDefault,
    justifyContent: 'center'
  },
  tableHeaderCellText: {
    color: Colors.tableHeaderText,
    fontSize: Fonts.size.default,
    textAlign: 'center'
  },
  tableItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.tableItemBackground
  },
  tableItemCell: {
    flex: 1,
    paddingHorizontal: Metrics.paddingDefault / 2,
    paddingVertical: Metrics.paddingDefault * 0.3,
    justifyContent: 'flex-start'
  },
  tableItemCellText: {
    color: Colors.tableItemText,
    fontSize: Fonts.size.default
  },
  standardNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  standardNumber: {
    marginRight: Metrics.marginDefault,
    padding: Metrics.paddingDefault / 2,
    paddingTop: Metrics.paddingDefault * 0.7,
    margin: Metrics.marginDefault * 0.3
  },
  circleNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  circleNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.marginDefault * 0.3,
    width: Fonts.size.default * 2.4,
    height: Fonts.size.default * 2.4,
    borderRadius: Fonts.size.default * 1.2
  },
  circleNumberText: {
    fontSize: Fonts.size.default
  }
};

export default styles;
