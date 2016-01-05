class TreeNode(dict):
    def __init__(self, name, children=None):
        super().__init__()
        self.__dict__ = self
        self.name = name
        self.children = [] if not children else children

    def from_dict(dict_):
        """ Recursively (re)construct TreeNode-based tree from dictionary. """
        root = TreeNode(dict_['name'], dict_['children'])
        root.children = list(map(TreeNode.from_dict, root.children))
        return root

	if __name__ == '__main__':
	    import json

	    tree = TreeNode('Parent')
	    tree.children.append(TreeNode('Child 1'))
	    child2 = TreeNode('Child 2')
	    tree.children.append(child2)
	    child2.children.append(TreeNode('Grand Kid'))
	    child2.children[0].children.append(TreeNode('Great Grand Kid'))

	    json_str = json.dumps(tree, sort_keys=True, indent=2)
	    print(json_str)

	    print()
	    pyobj = TreeNode.from_dict(json.loads(json_str))  # reconstitute
	    print('pyobj class: {}'.format(pyobj.__class__.__name__))  # -> TreeNode
	    print(json.dumps(pyobj, sort_keys=True, indent=2))

TreeNode('1,2,3','4,5,6')
