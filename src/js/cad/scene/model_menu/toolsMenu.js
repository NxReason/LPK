import createTool from '../UIFactory/tool';
import {
  handleHeaderClick,
  handleAddBtnClick,
} from '../utils';

const $header = document.getElementById('panel-tools-open');
const $addBtn = document.getElementById('add-tool-btn');
const $toolsList = document.getElementById('panel-tools-list');

$header.addEventListener('click', () => handleHeaderClick($header, $toolsList));
$addBtn.addEventListener('click', () => handleAddBtnClick($header, $toolsList, createTool, 'toolCreated'));
