import { expect } from 'chai';
import GlobalStateManager from './global-state-manager';

interface GS {
  x: boolean;
  y: number;
  z: string;
}

const INITIAL_REDUCERS = {
  append: (gs: GS, ...args: string[]) => ({
    z: gs.z + args.join(''),
  }),
  increment: (gs: GS, y: number) => ({
    y: gs.y + y,
  }),
  toggle: (gs: GS) => ({
    x: !gs.x,
  }),
};

const INITIAL_STATE: GS = {
  x: false,
  y: 1,
  z: 'string',
};

export default (): void => {

  it('should initialize with an empty state object', () => {
    const globalStateManager: GlobalStateManager<{}> =
      new GlobalStateManager<{}, {}>();
    expect(globalStateManager.state).to.deep.equal({});
  });

  it('should initialize with an empty reducers object', () => {
    const globalStateManager: GlobalStateManager<{}> =
      new GlobalStateManager<{}, {}>();
    expect(globalStateManager.reducers).to.deep.equal({});
  });

  it('should initialize with an empty dispatchers object', () => {
    const globalStateManager: GlobalStateManager<{}> =
      new GlobalStateManager<{}, {}>();
    expect(globalStateManager.dispatchers).to.deep.equal({});
  });

  it('should support an initial state', () => {
    const globalStateManager: GlobalStateManager<GS> =
      new GlobalStateManager<GS>(INITIAL_STATE);
    expect(globalStateManager.state).to.deep.equal(INITIAL_STATE);
  });

  it('should support initial reducers', () => {
    const globalStateManager: GlobalStateManager<GS> =
      new GlobalStateManager<GS, typeof INITIAL_REDUCERS>(
        INITIAL_STATE,
        INITIAL_REDUCERS
      );
    expect(globalStateManager.reducers).to.deep.equal(INITIAL_REDUCERS);
  });

  it('should support initial dispatchers', () => {
    const globalStateManager: GlobalStateManager<GS> =
      new GlobalStateManager<GS, typeof INITIAL_REDUCERS>(
        INITIAL_STATE,
        INITIAL_REDUCERS
      );
    expect(Object.keys(globalStateManager.dispatchers))
      .to.deep.equal(Object.keys(INITIAL_REDUCERS));
  });
};