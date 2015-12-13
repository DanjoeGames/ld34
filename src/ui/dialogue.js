import Container from './container';
import Element from '../util/element';

const div = Element.partial('div');

export default function(dialogue) {
  return div({ class: 'dialogue' }, [
    dialogue
  ]);
}

