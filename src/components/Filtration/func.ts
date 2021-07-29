export const updateFilterPath = (parentPath: string, filter: any): any => {
  const left = filter.path.slice(0, filter.path.lastIndexOf('/'))
  const updatePath = filter.path.includes('/')
    ? [left, parentPath].join('/')
    : parentPath

  function getFilterChildren(path: string, children: any) {
    return children.map((item: any) => {
      const second = item.path.slice(item.path.lastIndexOf('/') + 1)
      const newPath = [path, second].join('/')
      return {
        ...item,
        path: newPath,
        children: getFilterChildren(newPath, item.children)
      }
    })
  }

  return {
    ...filter,
    name: parentPath,
    path: updatePath,
    children: filter.children.length
      ? getFilterChildren(updatePath, filter.children)
      : []
  }
}
