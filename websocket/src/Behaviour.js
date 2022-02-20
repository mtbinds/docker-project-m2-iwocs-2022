/**
 * abstract behaviour class
 * compute behaviour action sent in parameter
 */
class AbstractBehaviour {
    constructor() {
        this._steps = 1;
    }

    compute(action) {
        if(typeof action !== 'function')
            return;
        for(let i = 0; i < this._steps; i++) {
            action(action);
        }
    }
}

/**
 * Normal behaviour class
 * with few steps
 * step is set to 1
 */
class NormalBehaviour extends AbstractBehaviour {
    constructor() {
        super();
        console.log('calling NormalBehaviour');
        this._steps = 1;
    }

    compute(action) {
        super.compute(action);
    }
}

/**
 * Normal behaviour class
 * simulate action done by normal client
 * step is set to 10
 */
class GentleBehaviour extends AbstractBehaviour {
    constructor() {
        super();
        console.log('calling GentleBehaviour');
        this._steps = 10;
    }

    compute(action) {
        super.compute(action);
    }
}

/**
 * Aggressive behaviour class
 * simulate action done by aggressive client
 * set is set to 10000
 */
class AggressiveBehaviour extends AbstractBehaviour {
    constructor() {
        super();
        console.log('calling AggressiveBehaviour');
        this._steps = 10000;
    }

    compute(action) {
        super.compute(action);
    }
}

/**
 * Factory class for our behaviours
 */
export class BehaviourFactory {
    createBehaviour(behaviourType){
        switch (behaviourType) {
            case 'gentle':
                return new GentleBehaviour();
                break;
            case 'aggressive':
                return new AggressiveBehaviour();
                break;
            default:
                return new NormalBehaviour();
        }
    }
}
