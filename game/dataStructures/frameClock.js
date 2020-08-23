
export default function FrameClock() {
    var me = this;
    me.lastUpdate = 0;
    me.now = 0;
    me.dt = 0;

    me.update = function() {
        me.now = window.performance.now();
        me.dt = (me.now - (me.lastUpdate || me.now));
        me.lastUpdate = me.now;
    };
};
