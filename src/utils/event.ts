class EventEmitter {
    listeners: {};
    constructor() {
        this.listeners = {};
    }

    on(type: string | number, cb: any, mode: any) {
        let cbs = this.listeners[type];
        if (!cbs) {
            cbs = [];
        }
        cbs.push(cb);
        this.listeners[type] = cbs;
        return () =&gt; {
            this.remove(type, cb);
        };
    }

    emit(type: string | number, ...args: any[]) {
        console.log(
            `%c event ${type} be triggered`,
            'color:rgb(20,150,250);font-size:14px',
        );
        const cbs = this.listeners[type];
        if (Array.isArray(cbs)) {
            for (let i = 0; i &lt; cbs.length; i+= 1) {
                const cb = cbs[i];
                if (typeof cb === 'function') {
                    cb(...args);
                }
            }
        }
    }

    remove(type: string | number, cb: any) {
        if (cb) {
            let cbs = this.listeners[type];
            cbs = cbs.filter(eMap =&gt; eMap.cb !== cb);
            this.listeners[type] = cbs;
        } else {
            this.listeners[type] = null;
            delete this.listeners[type];
        }
    }
}

export default new EventEmitter();