module.exports = () => {
  const animationEvents = ['animationend', 'oAnimationEnd', 'MSAnimationEnd', 'animationend', 'webkitAnimationEnd'];
  const animations = ['animation', 'oAnimation', 'MSAnimation', 'MozAnimation', 'WebkitAnimation'];
  const element = document.createElement('element');
  let animationEvent;
  animations.some((animation, index) => {
    const condition = element.style[animation] !== undefined;
    if (condition) {
      animationEvent = animationEvents[index];
    }
    return condition;
  });
  return animationEvent;
};
