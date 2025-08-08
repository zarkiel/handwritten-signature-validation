! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("@popperjs/core"), require("bootstrap")) : "function" == typeof define && define.amd ? define(["@popperjs/core", "bootstrap"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).nifty = t(e.core, e.bootstrap)
}(this, function(t, i) {
    "use strict";
    const n = {
            find(e, t = document.documentElement) {
                return [].concat(...Element.prototype.querySelectorAll.call(t, e))
            },
            findOne(e, t = document.documentElement) {
                return Element.prototype.querySelector.call(t, e)
            }
        },
        o = {
            trim(e) {
                return e.replace(/\s/g, "")
            },
            listenerName(e) {
                return `_${e}Handler`
            },
            removeDots(e) {
                return e.replace(/\./g, "")
            }
        };
    class e {
        constructor(e, t) {
            if (e && "object" == typeof e && (this._element = e, this._parent = e.parentElement, t)) {
                this._listener = {};
                for (const i in t = "string" == typeof t ? {
                        action: t = o.trim(t).split(",")
                    } : t) {
                    var s = "string" == typeof t[i] ? o.trim(t[i]).split(",") : t[i];
                    this._createHandler(s, o.listenerName(i))
                }
            }
        }
        _createHandler(t, s) {
            try {
                this[s] = this[s].bind(this)
            } catch (e) {
                throw new Error(`Add a listener function called "${s}" to handle the ${t.toString()} event.`)
            }
            for (const e of t) this._listener[e] = s, this._element.addEventListener(e, this[s], !1)
        }
        dispose() {
            if (this._element && this._listener)
                for (const e in this._listener) this._element.removeEventListener(e, this[this._listener[e]]);
            for (const t of Object.getOwnPropertyNames(this)) this[t] = null
        }
    }
    var s = "data-nf-toggler";
    const a = {
        event: "click",
        dataKey: s,
        dataTargetKey: "data-nf-target",
        dataClassKey: "data-nf-class",
        toggleMode: {
            FullScreen: "fullscreen",
            FullPage: "fullpage",
            Dismiss: "dismiss",
            Class: "class"
        }
    };
    class r extends e {
        constructor(e, t) {
            t = Object.assign(a, t);
            super(e, t.event), this._config = t, this._target = this._element.closest(this._element.getAttribute(this._config.dataTargetKey)) || n.findOne(this._element.getAttribute(this._config.dataTargetKey)), this._element.getAttribute(this._config.dataTargetKey) || console.error(`The Toggler component MUST have a dataset called [${this._config.dataTargetKey}] to represent the target`), !this._target && this._element.getAttribute(this._config.dataTargetKey) && console.error(`Can't find a "${e.getAttribute(this._config.dataTargetKey)}" target`), this._toggleType = this._getToggleType(), this._status = this._updateStatus(), this._element.getAttribute(this._config.dataKey), this._toggleClass = this._element.getAttribute(this._config.dataClassKey), this._toggleType != this._config.toggleMode.Class || this._element.getAttribute(this._config.dataClassKey) || console.error(`The Toggler component MUST have a dataset called [${this._config.dataClassKey}] to represent the class you want to toggle`)
        }
        static get Default() {
            return a
        }
        _actionHandler() {
            "FullScreen" == this._toggleType ? this._fullscreen() : "FullPage" == this._toggleType ? this._fullpage() : "Dismiss" == this._toggleType ? this._dismiss() : "Class" == this._toggleType && this._class(), this._status = this._updateStatus()
        }
        _getToggleType() {
            for (const e in this._config.toggleMode)
                if (this._element.getAttribute(this._config.dataKey) == this._config.toggleMode[e]) return e
        }
        _updateStatus() {
            return "FullScreen" == this._toggleType ? document.fullscreenElement ? "fullscreen" : "normal" : "FullPage" == this._toggleType ? this._target.classList.contains("content-full-page") ? "fullpage" : "normal" : "Dismiss" == this._toggleType ? this._target ? "normal" : "dismissed" : "Class" == this._toggleType ? this._target.classList.contains(this._toggleClass) ? "added" : "removed" : void 0
        }
        _fullscreen() {
            document.fullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : this._target.requestFullscreen ? this._target.requestFullscreen() : this._target.webkitRequestFullscreen && this._target.webkitRequestFullscreen()
        }
        _fullpage() {
            this._target.classList.toggle("content-full-page"), body.classList.toggle("body-sc")
        }
        _dismiss() {
            this._target.remove(), this._target = null, super.dispose()
        }
        _class() {
            this._target.classList.toggle(this._toggleClass)
        }
        getStatus() {
            return this._status
        }
    }
    n.find(`[${s}]`).forEach(e => new r(e));
    class l extends e {
        constructor(e) {
            super(e, {
                show: "show.bs.dropdown",
                hide: "hide.bs.dropdown"
            }), this._menu = n.findOne(".dropdown-menu", this._parent)
        }
        _showHandler() {
            this._menu.classList.remove("mot", "mol", "mor")
        }
        _hideHandler() {
            var t = this._menu ? this._menu.getAttribute("data-popper-placement") : null;
            if (t) {
                var s = ["top", "right-end", "left-end"];
                t.includes("left") && this._menu.classList.add("mol");
                for (let e = 0; e < s.length; e++)
                    if (t.includes(s[e])) {
                        this._menu.classList.add("mot");
                        break
                    }
            }
            this._menu.getAttribute("data-bs-popper") && this._menu.classList.add("mst")
        }
    }
    n.find(".dropdown-toggle").forEach(e => {
        n.find(".dropdown", e.parentElement) && new l(e)
    });
    const c = "click";
    var s = ".nav-toggler",
        h = ".sidebar-toggler";
    const d = "mn--min",
        _ = "mn--max",
        g = "mn--show",
        u = "sb--show",
        m = {
            event: c,
            eventSidebarsChange: "change.nf.sidebar",
            eventSidebarsChanged: "changed.nf.sidebar",
            selectorRoot: "#root",
            selectorToggleNav: s,
            selectorToggleSidebar: h,
            selectorNav: ".mainnav",
            selectorSidebar: ".sidebar"
        };
    class p extends e {
        constructor(e, t) {
            t = Object.assign(m, t);
            super(e, t.event), this._config = t, this._root = n.findOne(this._config.selectorRoot), this._nav = n.findOne(this._config.selectorNav), this._sidebar = n.findOne(this._config.selectorSidebar), this._toggleType = e.classList.contains(this._config.selectorToggleNav.replace(".", "")) ? "NAV" : "SIDEBAR", this._removeBackdrop = this._removeBackdrop.bind(this), this._eventSidebarsChange = new Event(this._config.eventSidebarsChange), this._eventSidebarsChanged = new Event(this._config.eventSidebarsChanged)
        }
        static get Default() {
            return m
        }
        _actionHandler(e) {
            e.stopPropagation(), "NAV" == this._toggleType ? window.innerWidth < 992 || !this._root.classList.contains(d) && !this._root.classList.contains(_) ? (this._root.classList.toggle(g), document.addEventListener(c, this._removeBackdrop, !1)) : (this._root.classList.toggle(d), this._root.classList.toggle(_)) : (this._root.classList.toggle(u), document.addEventListener(c, this._removeBackdrop, !1)), this._dispatchEvent()
        }
        _dispatchEvent() {
            //console.log(this._nav,this._eventSidebarsChange )
            this._transitionEnd = this._transitionEnd.bind(this), ("NAV" == this._toggleType ? (this._nav.dispatchEvent(this._eventSidebarsChange), this._nav) : (this._sidebar.dispatchEvent(this._eventSidebarsChange), this._sidebar)).addEventListener("transitionend", this._transitionEnd)
        }
        _transitionEnd(e) {
            "max-width" != e.propertyName && "transform" != e.propertyName || (e.target == this._nav ? (this._nav.removeEventListener("transitionend", this._transitionEnd), this._nav.dispatchEvent(this._eventSidebarsChanged)) : e.target == this._nav && (this._sidebar.removeEventListener("transitionend", this._transitionEnd), this._sidebar.dispatchEvent(this._eventSidebarsChanged)), document.dispatchEvent(this._eventSidebarsChanged))
        }
        _removeBackdrop(e) {
            e.target !== this._root && (e.target.closest(this._config.selectorNav) || e.target.closest(this._config.selectorSidebar)) || (this._root.classList.remove(g), this._root.classList.contains("sb--stuck") || this._root.classList.remove(u), this._dispatchEvent(), document.removeEventListener(c, this._removeBackdrop))
        }
    }
    n.find(s + ", " + h).forEach(e => new p(e));
    s = p.Default.eventSidebarsChange, h = p.Default.eventSidebarsChanged;
    const v = "#root";
    const f = {
            show: "show.bs.collapse",
            shown: "shown.bs.collapse",
            hide: "hide.bs.collapse"
        },
        b = {
            placement: "right",
            strategy: "fixed",
            modifiers: [{
                name: "offset",
                options: {
                    offset: [0, 9]
                }
            }, {
                name: "arrow",
                options: {
                    padding: 15
                }
            }, {
                name: "preventOverflow",
                options: {
                    padding: 7
                }
            }]
        },
        C = {
            maxi: "mn--max",
            mini: "mn--min",
            push: "mn--push",
            slide: "mn--slide",
            reveal: "mn--reveal"
        };
    let L = {
        eventSidebarsChange: s,
        eventSidebarsChanged: h,
        eventOutsideTrigger: ["click", "touchend"],
        eventSubmenuToggler: ["click", "mouseenter"],
        selectorRoot: v,
        selectorContent: "#content",
        selectorNav: "#mainnav-container",
        selectorMininavToggle: ".mininav-toggle",
        selectorMininavContent: ".mininav-content"
    };
    class y extends e {
        constructor(e, t) {
            
            super(e, {
                navChange: (L = Object.assign(L, t)).eventSidebarsChange,
                navChanged: L.eventSidebarsChanged
            }), S = S || this, this._config = L, this.update()
        }
        static get Default() {
            return L
        }
        static get mode() {
            var e = n.findOne(v);
            for (const t in C)
                if (e.classList.contains(C[t])) return t
        }
        static setmode(e) {
            if (S) {
                var t = n.findOne(L.selectorRoot);
                t.classList.remove("mn--show");
                for (const s in C) e == s ? t.classList.add(C[s]) : t.classList.remove(C[s]);
                S._navChangeHandler()
            } else console.error("Can't find the Main Navigation element, so be sure to set it up properly.")
        }
        get called() {
            return this._called
        }
        set called(e) {
            this._called = e
        }
        update() {
            this._updateSelectors(), this._updateNavMode(), this._initializeCollapseMenu()
        }
        _navChangeHandler() {
            
            this._updateNavMode(), this._navSubmenus.forEach(e => {
                "mini" == this._mode && e._element.classList.contains("show") ? e._bsCollapse.hide() : "mini" != this._mode && e._popper && (e._popper.destroy(), e._popper = void 0)
            })
        }
        _navChangedHandler() {
            
            "mini" != this._mode && this._navSubmenus.forEach(e => {
                "maxi" == this._mode ? e._isLink || !e._parent.classList.contains("open") && !e._toggler.classList.contains("active") || e._bsCollapse.show() : e._isLink || this._root.classList.contains("mn--show") || (e._parent.classList.contains("open") || e._toggler.classList.contains("active") ? (e._collapseConfigParent = e._bsCollapse._config.parent, e._bsCollapse._config.parent = null, e._bsCollapse.show(), e._bsCollapse._config.parent = e._collapseConfigParent) : e._bsCollapse.hide())
            })
        }
        _updateSelectors() {
            this._root = n.findOne(this._config.selectorRoot), this._submenus = n.find(this._config.selectorMininavContent, this._element)
        }
        _updateNavMode() {
            
            for (const e in C) this._root.classList.contains(C[e]) && (this._mode = e)
        }
        _initializeCollapseMenu() {
            this._navSubmenus = this._submenus.map(e => new E(e, this._config, this))
        }
        _addListenerClickOutside() {
            this._isListenerAdded || (this._isListenerAdded = !0, this._isOutsideNavigation = this._isOutsideNavigation.bind(this), this._config.eventOutsideTrigger.forEach(e => document.addEventListener(e, this._isOutsideNavigation, !1)))
        }
        _removeListenerClickOutside() {
            this._isListenerAdded && (this._isListenerAdded = !1, this._config.eventOutsideTrigger.forEach(e => document.removeEventListener(e, this._isOutsideNavigation)))
        }
        _isOutsideNavigation(e) {
            e.target !== this._root && e.target.closest(this._config.selectorNav) || (this._navSubmenus.forEach(e => e._bsCollapse.hide()), this._removeListenerClickOutside())
        }
    }
    class E extends e {
        constructor(e, t, s) {
            //console.log(e, t, s)
            super(e, f), this._config = t, this._mainnav = s, this._toggler = n.findOne(this._config.selectorMininavToggle, this._parent) || this._parent.closest(this._config.selectorMininavToggle), this._isLink = !this._parent.classList.contains("has-sub"), this._childCollapse = n.find(this._config.selectorMininavToggle, this._element), this._bsCollapse = new i.Collapse(e, {
                parent: this._parent.parentElement.classList.contains(o.removeDots(this._config.selectorMininavContent)) ? this._parent.parentElement : this._mainnav._element,
                toggle: (this._parent.classList.contains("open") || this._toggler.classList.contains("active")) && "mini" != this._mainnav._mode
            }), (this._parent.classList.contains("open") || this._toggler.classList.contains("active") && "mini" != this._mainnav._mode) && (this._element.style.transitionDuration = "0s", this._element.addEventListener("transitionend", () => this._element.style.transitionDuration = null, {
                once: !0
            })), this._submenuToggle = this._submenuToggle.bind(this), this._config.eventSubmenuToggler.forEach(e => {
                this._toggler.addEventListener(e, this._submenuToggle, !1)
            })
        }
        _submenuToggle(e) {
            
            e.stopPropagation(), "mini" != this._mainnav._mode && "mouseenter" == e.type || (this._isLink || e.preventDefault(), this._mainnav.called = this._element, this._bsCollapse.toggle())
        }
        _showHandler() {
            
            if (!this._element.classList.contains("show"))
                if ("mini" == this._mainnav._mode) {
                    
                    if (!this._popper) try {
                        
                        this._popper = Popper.createPopper(this._toggler, this._element, b)
                    } catch (e) {
                        this._popper = t.createPopper(this._toggler, this._element, b)
                    }
                    this._popper.update()
                } else this._toggler.classList.remove("collapsed")
        }
        _hideHandler() {
            var e;
            this._element.contains(this._mainnav.called) && this._element !== this._mainnav.called || (this._isLink || this._toggler.classList.add("collapsed"), "mini" == this._mainnav._mode && this._childCollapse.length && (e = n.findOne(this._config.selectorMininavContent + ".show", this._element)) && e.parentElement.querySelector(this._config.selectorMininavToggle).click())
        }
        _shownHandler() {
            "mini" == this._mainnav._mode ? (this._popper.update(), this._mainnav._addListenerClickOutside()) : (this._popper && this._popper.destroy(), this._mainnav._removeListenerClickOutside())
        }
    }
    let S = n.findOne(L.selectorNav);
    S = S && new y(S);
    s = ".mode-switcher";
    const w = "data-bs-theme";
    let T = new String,
        M = new Array,
        k = new Event("change.nf.colormode", {
            colorMode: document.documentElement.getAttribute(w)
        });
    const O = {
        event: "change",
        selectorSwitcher: s,
        selectorSwitcherIcons: ".mode-switcher-icon",
        availableColorMode: ["auto", "light", "dark"],
        dataBSColorMode: w
    };
    class A extends e {
        constructor(e, t) {
            t = Object.assign(O, t);
            super(e, t.event), M.push(this), this._config = t, this._icons = n.find(this._config.selectorSwitcherIcons, this._parent), this._updateColorMode(), this._updateState()
        }
        static setColorMode(e) {
            "auto" == (T = e) && (e = this.prefersTheme), document.documentElement.setAttribute(w, e), k.colorMode = e, document.dispatchEvent(k), M.forEach(e => e._updateState())
        }
        static get prefersTheme() {
            return window.matchMedia("( prefers-color-scheme: dark )").matches ? "dark" : "light"
        }
        static get Default() {
            return O
        }
        _actionHandler(e) {
            e = e.currentTarget;
            T = "checkbox" == e.type && null == e.getAttribute("value") ? e.checked ? "dark" : "light" : e.value, this.setColorMode(T)
        }
        _updateState() {
            if (this._updateColorMode(), "checkbox" == this._element.type && null == this._element.getAttribute("value")) this._element.checked = "dark" == this._colorMode;
            else if ("select-one" == this._element.type) {
                let e = this._element.querySelector(`[value="${T}"]`);
                (e = e || this._element.querySelector(`[value="${this._colorMode}"]`)).selected = !0
            } else {
                var e;
                "radio" != this._element.type && "checkbox" != this._element.type || (this._element.checked = this._element.value == this._colorMode, "auto" == T && ((e = document.querySelector(`[name="${this._element.getAttribute("name")}"][value="auto"]`)) ? e.checked = !0 : "checkbox" == this._element.type && "auto" == this._element.value && (this._element.checked = !0)))
            }
            this._icons.forEach(e => {
                e.classList.contains("icon-" + this._colorMode) ? e.classList.remove("d-none") : e.classList.add("d-none")
            })
        }
        _updateColorMode() {
            this._colorMode = document.documentElement.getAttribute(this._config.dataBSColorMode), "" == T && (T = this._colorMode)
        }
        _isAvailableMode(e) {
            for (const t in this._config.availableColorMode)
                if (e == this._config.availableColorMode[t]) return !0;
            return !1
        }
        _updateSwitchers() {
            M.forEach(e => e._updateState(this._colorMode))
        }
        update() {
            this._updateState()
        }
        setColorMode(e) {
            if (!this._isAvailableMode(e)) throw new Error(`The color mode "${e}" isn't available.`);
            "auto" == e && (e = this.constructor.prefersTheme), document.documentElement.setAttribute(this._config.dataBSColorMode, e), this._updateColorMode(), k.colorMode = this._colorMode, document.dispatchEvent(k), this._updateSwitchers()
        }
        dispose() {
            var e = M.indexOf(this); - 1 < e && M.splice(e, 1), super.dispose()
        }
    }
    return n.find(s).forEach(e => new A(e)), {
        Toggler: r,
        SmoothDropdown: l,
        SidebarToggler: p,
        MainNavigation: y,
        ColorModeSwitcher: A
    }
});
const body = document.body,
    root = document.getElementById("root"),
    colorChangedEv = new CustomEvent("scheme-changed"),
    themeChangedEv = new CustomEvent("theme-changed");
/* if (document.getElementById("_dm-boxedBgContent")) {
    const a = [...document.querySelectorAll("._dm-boxbg__thumb")];
    a.map(t => {
        t.addEventListener("click", e => {
            console.log(e)
            e.preventDefault(), t.classList.contains(".active") || ((e = document.querySelector("._dm-boxbg__thumb.active ")) && e.classList.remove("active"), t.classList.add("active"), e = t.querySelector("img").getAttribute("src").replace("thumbs", "bg").replace("./", "/"), body.style.backgroundImage = `url( .${e} )`)
        })
    })
} */
/* if (document.getElementById("_dm-settingsContainer")) {
    const f = {
            boxedLayoutRadio: document.getElementById("_dm-boxedLayoutRadio"),
            centeredLayoutRadio: document.getElementById("_dm-centeredLayoutRadio"),
            stickyHeaderCheckbox: document.getElementById("_dm-stickyHeaderCheckbox"),
            stickyNavCheckbox: document.getElementById("_dm-stickyNavCheckbox"),
            miniNavRadio: document.getElementById("_dm-miniNavRadio"),
            maxiNavRadio: document.getElementById("_dm-maxiNavRadio"),
            pushNavRadio: document.getElementById("_dm-pushNavRadio"),
            slideNavRadio: document.getElementById("_dm-slideNavRadio"),
            revealNavRadio: document.getElementById("_dm-revealNavRadio"),
            disableBackdropCheckbox: document.getElementById("_dm-disableBackdropCheckbox"),
            stuckSidebarCheckbox: document.getElementById("_dm-stuckSidebarCheckbox"),
            pinnedSidebarCheckbox: document.getElementById("_dm-pinnedSidebarCheckbox"),
            uniteSidebarCheckbox: document.getElementById("_dm-uniteSidebarCheckbox")
        },
        g = (f.boxedLayoutRadio.checked = body.classList.contains("boxed-layout"), f.centeredLayoutRadio.checked = body.classList.contains("centered-layout"), f.stickyHeaderCheckbox.checked = root.classList.contains("hd--sticky"), f.stickyNavCheckbox.checked = root.classList.contains("mn--sticky"), f.miniNavRadio.checked = root.classList.contains("mn--min"), f.maxiNavRadio.checked = root.classList.contains("mn--max"), f.pushNavRadio.checked = root.classList.contains("mn--push"), f.slideNavRadio.checked = root.classList.contains("mn--slide"), f.revealNavRadio.checked = root.classList.contains("mn--reveal"), f.disableBackdropCheckbox.checked = root.classList.contains("sb--bd-0"), f.stuckSidebarCheckbox.checked = root.classList.contains("sb--stuck"), f.pinnedSidebarCheckbox.checked = root.classList.contains("sb--pinned"), f.uniteSidebarCheckbox.checked = root.classList.contains("sb--unite"), document.getElementById("_dm-boxedBgBtn")),
        h = document.getElementById("_dm-boxedBgOption"),
        i = (f.boxedLayoutRadio.addEventListener("changed", e => {
            e.target.checked && !body.classList.contains("boxed-layout") ? (body.classList.add("boxed-layout"), h.classList.remove("opacity-50"), g.removeAttribute("disabled")) : (body.classList.remove("boxed-layout"), body.removeAttribute("style"), h.classList.add("opacity-50"), g.setAttribute("disabled", !0))
        }), f.centeredLayoutRadio.addEventListener("changed", () => {
            body.classList.toggle("centered-layout"), body.classList.contains("centered-layout") && root.classList.contains("mn--max") && f.miniNavRadio.click()
        }), document.getElementById("_dm-transitionSelect")),
        j = (i.addEventListener("change", e => {
            e = e.target;
            e.querySelector("option[selected]").removeAttribute("selected"), e[e.selectedIndex].setAttribute("selected", !0), body.classList.remove("in-quart", "out-quart", "in-back", "out-back", "in-out-back", "steps", "jumping", "rubber"), body.classList.add(e.value)
        }), f.stickyHeaderCheckbox.addEventListener("change", () => {
            root.classList.toggle("hd--sticky")
        }), document.getElementById("_dm-offcanvas")),
        k = new bootstrap.Offcanvas(j),
        l = document.getElementById("_dm-settingsToggler"),
        m = document.getElementById("_dm-settingsContainer"),
        n = ([...document.querySelectorAll("._dm-offcanvasBtn")].map(e => {
            e.addEventListener("click", () => {
                j.className = "offcanvas " + e.value, j.style = "transition-duration: 0s", l.dispatchEvent(new Event("click")), m.addEventListener("transitionend", () => {
                    j.style = "", k.show()
                }, {
                    once: !0
                })
            })
        }), f.stickyNavCheckbox.addEventListener("change", () => {
            root.classList.toggle("mn--sticky")
        }), document.querySelector("#_dm-mainnavProfile")),
        o = (document.getElementById("_dm-profileWidgetCheckbox").addEventListener("change", () => {
            n.classList.toggle("d-none")
        }), f.miniNavRadio.addEventListener("changed", e => {
            e.target.checked && !root.classList.contains("mn--min") && nifty.MainNavigation.setmode("mini")
        }), f.maxiNavRadio.addEventListener("changed", e => {
            e.target.checked && !root.classList.contains("mn--max") && nifty.MainNavigation.setmode("maxi")
        }), f.pushNavRadio.addEventListener("changed", e => {
            e.target.checked && !root.classList.contains("mn--push") && nifty.MainNavigation.setmode("push")
        }), f.slideNavRadio.addEventListener("changed", e => {
            e.target.checked && !root.classList.contains("mn--slide") && nifty.MainNavigation.setmode("slide")
        }), f.revealNavRadio.addEventListener("changed", e => {
            e.target.checked && !root.classList.contains("mn--reveal") && nifty.MainNavigation.setmode("reveal")
        }), document.addEventListener("changed.nf.sidebar", () => f[nifty.MainNavigation.mode + "NavRadio"].checked = !0), f.disableBackdropCheckbox.addEventListener("change", () => {
            root.classList.toggle("sb--bd-0")
        }), document.getElementById("_dm-staticSidebarCheckbox").addEventListener("change", () => {
            root.classList.toggle("sb--static")
        }), f.stuckSidebarCheckbox.addEventListener("change", () => {
            root.classList.toggle("sb--stuck")
        }), f.uniteSidebarCheckbox.addEventListener("change", () => {
            root.classList.toggle("sb--unite")
        }), f.pinnedSidebarCheckbox.addEventListener("change", () => {
            root.classList.toggle("sb--pinned")
        }), document.getElementById("dm_colorSchemesContainer")),
        p = o.querySelectorAll("._dm-colorSchemes"),
        q = document.documentElement.getAttribute("data-scheme"),
        r = (p.forEach(e => {
            e.getAttribute("data-color") == q && e.classList.add("active"), e.addEventListener("click", e => {
                document.documentElement.setAttribute("data-scheme", e.currentTarget.getAttribute("data-color")), o.querySelector(".active").classList.remove("active"), e.currentTarget.classList.add("active"), document.dispatchEvent(colorChangedEv)
            })
        }), document.getElementById("dm_colorModeContainer")),
        s = r.querySelectorAll("._dm-colorModeBtn"),
        t = ["tm--expanded-hd", "tm--fair-hd", "tm--full-hd", "tm--primary-mn", "tm--primary-brand", "tm--tall-hd"],
        u = t.filter(e => {
            if (root.classList.contains(e)) return e
        }).toString(),
        v = (s.forEach(e => {
            e.getAttribute("data-color-mode") == u && e.classList.add("active"), e.addEventListener("click", e => {
                e = e.currentTarget;
                e.classList.contains("active") || (root.classList.remove(...t), root.classList.add(e.getAttribute("data-color-mode")), s.forEach(e => {
                    e.classList.contains("active") && e.classList.remove("active")
                }), e.classList.add("active"), document.dispatchEvent(themeChangedEv))
            })
        }), m.querySelector("#_dm-fontSizeRange")),
        w = m.querySelector("#_dm-fontSizeValue"),
        x = (e, t, a, o) => {
            var d = e.value,
                n = e.min || 0,
                e = e.max || 100,
                e = Number(100 * (d - n) / (e - n));
            t.innerHTML = "" + a + d + o, t.style.left = `calc(${e}% + (${8 - .15 * e}px))`
        },
        y = (x(v, w, "", "px"), v.addEventListener("input", e => {
            x(e.currentTarget, w, "", "px"), document.documentElement.style.setProperty("font-size", e.currentTarget.value + "px")
        }), t => {
            let a = null;
            return [...document.getElementsByTagName("link")].map(e => e.href.includes(t) ? a = e : null), "bootstrap" == t ? bootstrapLinkEl = a : niftyLinkEl = a, a
        }),
        z = y("bootstrap.").getAttribute("href"),
        A = z.match(/^.*?assets/g).toString(),
        B = {
            className: "os-nifty-minimal",
            scrollbars: {
                autoHide: "leave",
                clickScrolling: !0
            },
            overflowBehavior: {
                x: "visible-scroll"
            }
        },
        C = () => new Promise((t, a) => {
            if (document.getElementById("_dm-jsOverlayScrollbars")) t("done");
            else {
                let e = document.createElement("link");
                e.setAttribute("id", "_dm-cssOverlayScrollbars"), e.setAttribute("rel", "stylesheet"), e.setAttribute("href", A + "/vendors/overlayscrollbars/overlayscrollbars.min.css"), document.querySelector("head").append(e), (e = document.createElement("script")).setAttribute("id", "_dm-jsOverlayScrollbars"), e.setAttribute("src", A + "/vendors/overlayscrollbars/overlayscrollbars.browser.es6.min.js"), document.body.append(e), e.addEventListener("load", t, {
                    once: !0
                }), e.onerror = a
            }
        });
    document.getElementById("_dm-bodyScrollbarCheckbox").addEventListener("change", async e => {
        await C();
        var t = OverlayScrollbarsGlobal["OverlayScrollbars"];
        e.target.checked ? t(body, B) : t(body).destroy()
    }), document.getElementById("_dm-sidebarsScrollbarCheckbox").addEventListener("change", async e => {
        await C();
        const t = OverlayScrollbarsGlobal["OverlayScrollbars"];
        var a = document.querySelectorAll(".scrollable-content");
        e.target.checked ? a.forEach(e => t(e, B)) : a.forEach(e => t(e).destroy())
    })
}
const radioEvent = new Event("changed");
[...document.querySelectorAll("#_dm-settingsContainer input[type='radio']")].map(t => {
    t.previous = t.checked, t.addEventListener("transitionend", e => {
        "background-color" == e.propertyName && t.previous != t.checked && (t.previous = t.checked, e.target.dispatchEvent(radioEvent))
    })
}); */