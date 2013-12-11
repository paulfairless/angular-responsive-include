angular-responsive-include
==========================

Angular directive for conditional includes based on media queries. Allows you to include responsive markup in your Angular apps.

## Requirements
[Angularjs](http://http://angularjs.org/) v1.2.x

## Usage
Use this drective as a replacement for ng-include. 

This directive will check a media query to determine if the content should be rendered. It will also trigger when the screen is resized and breakpoints are met. 

```html
  <div class="small include">
    <ng-include-resp src="'/views/small.html'" is-default mq="(max-width:899px)"></ng-include-resp>
  </div>
  <div class="large include">
    <ng-include-resp src="'/views/large.html'" mq="(min-width:900px)"></ng-include-resp>
  </div>
```

### Options
  * **src** the template to include
  * **mq** the media query that must match to trigger the include
  * **is-default** if media queries are not supported (IE8) then this template will be included regardless

## Examples
coming soon ...
