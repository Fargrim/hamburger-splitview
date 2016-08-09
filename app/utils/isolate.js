import {cloneElement} from 'react';

function isolate(elementFn, scope) {
  return sources => isolateSink(elementFn(isolateSource(sources, scope)),scope);
}

const isolateSource = (sources, scope) => {
  return {
    DOM: sources.DOM.select(`.${scope}`),
    props: sources.props
  }
};

const isolateSink = (sinks, scope) => ({
  DOM: sinks.DOM
    .map(vtree => cloneElement(vtree, {className: `${vtree.props.className} ${scope}`}))
});

export default isolate;