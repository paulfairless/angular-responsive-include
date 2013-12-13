angular-responsive-include
==========================

Sometimes css isn't quite enough to get that sweet responsive site working perfectly. Responsive Markup is an approach to adapting the HTML markup of your page based on Media Queries.

A good indicator for using this pattern is when your css shows and hides content based on breakpoints, a common example would be off-page mobile navigation.

angular-responsive-include is a directive I've created to provide an elegant way to follow the Responsive Markup pattern in your Angularjs apps.

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
