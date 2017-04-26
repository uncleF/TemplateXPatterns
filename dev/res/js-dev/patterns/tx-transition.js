module.exports = () => {
  const transitionEvents = ['transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'transitionend', 'webkitTransitionEnd'];
  const transitions = ['transition', 'oTransition', 'MSTransition', 'MozTransition', 'WebkitTransition'];
  const element = document.createElement('element');
  let transitionEvent;
  transitions.some((transition, index) => {
    const condition = element.style[transition] !== undefined;
    if (condition) {
      transitionEvent = transitionEvents[index];
    }
    return condition;
  });
  return transitionEvent;
};
