import { createProjectFile, createUserFile } from 'common/util';

const getName = filePath => filePath.split('/').pop();
const getContent = filePath => require('!raw-loader!./' + filePath).default;
const readProjectFile = filePath => createProjectFile(getName(filePath), getContent(filePath));
const readUserFile = filePath => createUserFile(getName(filePath), getContent(filePath));

export const CODE_CPP = readUserFile('skeletons/code.cpp');
export const CODE_JAVA = readUserFile('skeletons/code.java');
export const CODE_JS = readUserFile('skeletons/code.js');
export const ROOT_README_MD = readProjectFile('algorithm-visualizer/README.md');
export const SCRATCH_PAPER_README_MD = readProjectFile('scratch-paper/README.md');

export const DSA_SINGLY_LINKED_LIST_JS = readUserFile('dsa-hdu/singly-linked-list/code.js');
export const DSA_SINGLY_LINKED_LIST_MD = readProjectFile('dsa-hdu/singly-linked-list/README.md');
export const DSA_DOUBLY_LINKED_LIST_JS = readUserFile('dsa-hdu/doubly-linked-list/code.js');
export const DSA_DOUBLY_LINKED_LIST_MD = readProjectFile('dsa-hdu/doubly-linked-list/README.md');

