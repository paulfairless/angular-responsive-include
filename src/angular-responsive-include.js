'use strict';
(function(){

    var app = angular.module('ngIncludeResp', []);

    var NG_INCLUDE_PRIORITY = 500;

    app.directive('ngIncludeResp',  ['$http', '$templateCache', '$anchorScroll', '$compile', '$animate', '$sce', '$window',
    function($http,   $templateCache,   $anchorScroll,   $compile,   $animate,   $sce,  $window) {
        return {
            restrict: 'ECA',
            terminal: true,
            transclude: 'element',
            compile: function(element, attr, transclusion) {
                var mqSupported = true;
                if (typeof(matchMedia) !== 'function') {
                    mqSupported = false;
                }

                var srcExp = attr.ngIncludeResp || attr.src,
                    onloadExp = attr.onload || '',
                    autoScrollExp = attr.autoscroll,
                    mq,
                    isDefault = false;

                if (mqSupported) {
                    mq = $window.matchMedia(attr.mq);
                } else {
					isDefault = attr.isDefault;
                }

                return function(scope, $element) {
                    var changeCounter = 0,
                        currentScope,
                        currentElement,
                        listener,
                        parsedSrc;

                    var cleanupLastIncludeContent = function() {

                        if (currentScope) {
                            currentScope.$destroy();
                            currentScope = null;
                        }
                        if(currentElement) {
                            $animate.leave(currentElement);
                            currentElement.empty();
                            currentElement = null;
                        }
                    };

                    var ngIncludeAction = function(mq) {
                        var thisChangeId = ++changeCounter;
                        if (parsedSrc && (isDefault || (mqSupported && mq.matches))) {
                            $http.get(parsedSrc, {cache: $templateCache}).success(function(response) {
                                if (thisChangeId !== changeCounter) return;
                                var newScope = scope.$new();
                                transclusion(newScope, function(clone) {
                                    cleanupLastIncludeContent();

                                    currentScope = newScope;
                                    currentElement = clone;

                                    currentElement.html(response);
                                    $animate.enter(currentElement, null, $element);
                                    $compile(currentElement.contents())(currentScope);

                                    if (typeof autoScrollExp !== 'undefined' && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                                        $anchorScroll();
                                    }

                                    currentScope.$emit('$includeContentLoaded');
                                    scope.$eval(onloadExp);
                                });
                            }).error(function() {
                                if (thisChangeId === changeCounter) cleanupLastIncludeContent();
                            });

                            scope.$emit('$includeContentRequested');
                        } else {
                            cleanupLastIncludeContent();
                        }
                    };

                    scope.$watch($sce.parseAsResourceUrl(srcExp), function ngIncludeWatchAction(src) {
                        parsedSrc = src;
                        ngIncludeAction(mq);
                    });
                    scope.$on('$destroy', function () {
                        if (mqSupported) {
                            mq.removeListener(ngIncludeAction);
                        }
                    });

                    if (mqSupported) {
                        mq.addListener(ngIncludeAction);
                    }

                };
            }
        };
    }]);
})();