import { mount } from '@vue/test-utils'
import HighlightInput from './HighlightInput.vue';

describe('HighlightInput', () => {
  it('should display header text', () => {
    const wrapper = mount(HighlightInput, {
      props: { 
      index: 0, text: "match me", color: "eeefff", onDelete: () => {}}});

    expect(wrapper.find('input[name="pattern"]')).toBeTruthy();
  })
})