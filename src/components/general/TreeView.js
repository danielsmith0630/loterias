import React, { Component } from 'react';
import {
  FlatList, ScrollView, Text, TouchableOpacity, View
} from 'react-native';

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.rootNode = this._configNode(this.props.data, null);
    this.state = {
      list: this._configRootList(this.rootNode),
      selectedNode: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.node !== nextProps.node) {
      this.rootNode = this._configNode(this.props.data, null);
      const oldSelectedNode = this.state.selectedNode;
      if (oldSelectedNode !== null) {
        this.setState({
          list: this._configRootList(),
          selectedNode: this._findNodeById(oldSelectedNode.id, this.rootNode)
        });
      }
    }
  }

  onNodePress(node, options = { trigger: true, toggle: true }, info = null, origin = 0) {
    if (node) {
      const item = node;
      if (item.collapsable) {
        if (options.toggle) {
          item.expanded = !item.expanded;
        }
      }
      this.setState({
        list: this._configRootList(),
        selectedNode: node
      });
    } else {
      this.setState({
        selectedNode: node
      });
    }
    if (options.trigger) {
      this.props.onSelected(node, info, origin);
    }
  }

  getRootNode() {
    return this.rootNode;
  }

  getSelectedNode() {
    return this.state.selectedNode;
  }

  _configNode(node, parentNode) {
    const retNode = { ...node, parentNode };
    retNode.depth = parentNode ? (parentNode.depth + 1) : 0;
    if (node.childNodes) {
      retNode.childNodes = [];
      const { childNodes } = node;
      for (let i = 0, ni = childNodes.length; i < ni; i++) {
        const childNode = childNodes[i];
        const retChildNode = this._configNode(childNode, retNode);
        retNode.childNodes.push(retChildNode);
      }
    }
    return retNode;
  }

  _configRootList() {
    let list = [];
    const { rootNode } = this;
    if (this.props.showRoot) {
      list.push(rootNode);
    }
    list = this._configList(list, rootNode.childNodes);
    return list;
  }

  _configList(list, nodes) {
    if (nodes && nodes.length > 0) {
      for (let i = 0, ni = nodes.length; i < ni; i++) {
        const node = nodes[i];
        list.push(node);
        if (node.expanded && node.childNodes && node.childNodes.length) {
          this._configList(list, node.childNodes);
        }
      }
    }
    return list;
  }

  _findNodeById(id, node) {
    if (node.id === id) {
      return node;
    }

    if (node.childNodes && node.childNodes.length > 0) {
      const { childNodes } = node;
      for (let i = 0, ni = childNodes.length; i < ni; i++) {
        const childNode = childNodes[i];
        const findNode = this._findNodeById(id, childNode);
        if (findNode) {
          return findNode;
        }
      }
    }
    return null;
  }

  _keyExtractor(item, index) {
    return `${index}`;
  }

  updateDataById(data) {
    data.forEach((item) => {
      const node = this._findNodeById(item.id, this.rootNode);
      if (node) {
        node.data = { ...node.data, ...item.data };
      }
    });
  }

  selectNodeById(id, options = { toggle: true, trigger: true }, info = null) {
    const node = this._findNodeById(id, this.rootNode);
    this.selectNode(node, options, info);
  }

  selectNode(node, options = { toggle: true, trigger: true }, info = null) {
    if (node) {
      let { parentNode } = node;
      while (parentNode) {
        if (parentNode.collapsable) {
          parentNode.expanded = true;
        }
        parentNode = parentNode.parentNode;
      }
      this.onNodePress(node, options, info, 1);
    }
  }

  renderContent(item) {
    return (
      <TouchableOpacity onPress={this.onNodePress.bind(this, item, { toggle: true, trigger: true }, null, 0)} activeOpacity={0.6}>
        {this.props.renderContent(item, this.state.selectedNode === item)}
      </TouchableOpacity>
    );
  }

  renderItem({ item }) {
    return (
      <View>
        {this.renderContent(item)}
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={this.props.containerStyle ? this.props.containerStyle : null}>
        <FlatList
          keyExtractor={this._keyExtractor.bind(this)}
          data={this.state.list}
          renderItem={this.renderItem.bind(this)}
        />
      </ScrollView>
    );
  }
}

TreeView.defaultProps = {
  renderContent: node => (<Text>{node.Text}</Text>),
  onSelected: () => {},
  showRoot: false
};

export default TreeView;
