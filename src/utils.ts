export const getLinkedListTracks = (data: any[], key: string) => {
  const newNodes: any = {};
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const nextNode = data[i + 1];
    const prevNode = data[i - 1];

    newNodes[node[key]] = {
      ...node,
      next: i < data.length - 1 ? nextNode[key] : undefined,
      prev: i > 0 ? prevNode[key] : undefined
    };
  }

  return { newNodes };
};
