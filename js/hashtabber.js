

function hasClass(el, cl) {
    return el.className && new RegExp('(\\s|^)' + cl + '(\\s|$)').test(el.className);
}
function addClass(el, cl) {
    if (!hasClass(el, cl)) { el.className += ' ' + cl; }
}
function removeClass(el, cl) {
    var reg = new RegExp('(\\s|^)' + cl + '(\\s|$)');
    el.className = el.className.replace(reg, ' ').replace(/(^\s*)|(\s*$)/g, '');
}
function toggleClass(el, cl) {
    if (hasClass(el, cl)) { removeClass(el, cl); } else { addClass(el, cl); }
}




function HashTabber(customOptions) {
    this.options = {
        classActive: 'active',
        classData: 'hashTabber-data',
        classNav: 'hashTabber-nav',
        dataDefault: 'data-hashtabber-default',
        dataId: 'data-hashtabber-id',
        dataPair: 'data-hashtabber-pair'
    };
    
    if (customOptions) {
        
        if (customOptions.classActive) { this.options.classActive = customOptions.classActive; }
        if (customOptions.classData) { this.options.classData = customOptions.classData; }
        if (customOptions.classNav) { this.options.classNav = customOptions.classNav; }
        if (customOptions.dataDefault) { this.options.dataDefault = customOptions.dataDefault; }
        if (customOptions.dataId) { this.options.dataId = customOptions.dataId; }
        if (customOptions.dataPair) { this.options.dataPair = customOptions.dataPair; }
    }
    this.helpers = {
        hashProber: function () {
            
            var hash = String(window.location.hash.replace('#', ''));
            var outcome = false;
            
            if (hash.length !== 0) {
                outcome = hash.split(/\=|&/);
            }
            return outcome;
        },
        idsGiver: function (options) {
            var a, b, c, d;
            var tabberId;
            var tabberDefault;
            var tabName;
            var navList;
            var navLiChildren;
            var dataList;
            var tabbers = document.querySelectorAll('.' + options.classNav);
            
            for (a = 0; a < tabbers.length; a += 1) {
                
                tabberId = tabbers[a].getAttribute(options.dataId);
                tabberDefault = '0';
                tabName = '';
                
                if (tabbers[a].getAttribute(options.dataDefault)) {
                    tabberDefault = tabbers[a].getAttribute(options.dataDefault);
                }
                
                navList = tabbers[a].querySelectorAll('.' + options.classNav + '>li');
                for (b = 0; b < navList.length; b += 1) {
                    
                    tabName = String(b);
                    if (navList[b].getAttribute(options.dataPair)) {
                        tabName = navList[b].getAttribute(options.dataPair);
                    }
                    
                    navLiChildren = navList[b].childNodes;
                    for (c = 0; c < navLiChildren.length; c += 1) {
                        if (navLiChildren[c].nodeName === 'A') {
                            navLiChildren[c].setAttribute('href', '#' + tabberId + '=' + tabName);
                        }
                    }
                    
                    if (tabName === tabberDefault) {
                        addClass(navList[b], options.classActive);
                    }
                }
                
                dataList = document.querySelectorAll('.' + options.classData + '[' + options.dataId + '="' + tabberId + '"]' + '>li');
                for (d = 0; d < dataList.length; d += 1) {
                    
                    tabName = String(d);
                    if (dataList[d].getAttribute(options.dataPair)) {
                        tabName = dataList[d].getAttribute(options.dataPair);
                    }
                    
                    if (tabName === tabberDefault) {
                        addClass(dataList[d], options.classActive);
                    }
                }
            }
            return true;
        },
        tabSwiper: function (options, hashArray) {
            var a, b, c;
            var parameter;
            var value;
            var tabName;
            var tabberNavList;
            var tabberDataList;
            
            for (a = 0; a < hashArray.length; a += 2) {
                
                parameter = hashArray[a];
                value = hashArray[a + 1];
                tabName = '';
                
                if (document.querySelectorAll('.' + options.classNav + ' a[href*="#' + parameter + '=' + value + '"]').length > 0) {
                    
                    tabberNavList = document.querySelectorAll('.' + options.classNav + '[' + options.dataId + '="' + parameter + '"]' + '>li');
                    tabberDataList = document.querySelectorAll('.' + options.classData + '[' + options.dataId + '="' + parameter + '"]' + '>li');
                    
                    for (b = 0; b < tabberNavList.length; b += 1) {
                        
                        tabName = String(b);
                        if (tabberNavList[b].getAttribute(options.dataPair)) {
                            tabName = tabberNavList[b].getAttribute(options.dataPair);
                        }
                        
                        if (tabName === value) {
                            addClass(tabberNavList[b], options.classActive);
                        } else {
                            removeClass(tabberNavList[b], options.classActive);
                        }
                    }
                    
                    for (c = 0; c < tabberDataList.length; c += 1) {
                        
                        tabName = String(c);
                        if (tabberDataList[c].getAttribute(options.dataPair)) {
                            tabName = tabberDataList[c].getAttribute(options.dataPair);
                        }
                        
                        if (tabName === value) {
                            addClass(tabberDataList[c], options.classActive);
                        } else {
                            removeClass(tabberDataList[c], options.classActive);
                        }
                    }
                }
            }
            return true;
        }
    };
    this.run = function () {
        var that = this;
        
        that.helpers.idsGiver(that.options);
        
        that.helpers.tabSwiper(that.options, that.helpers.hashProber());
        
        window.onhashchange = function () {
            that.helpers.tabSwiper(that.options, that.helpers.hashProber());
        };
        return true;
    };
    return true;
}
