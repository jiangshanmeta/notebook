# [Web Accessibility Cookbook](https://book.douban.com/subject/37153759/)

[Offcial Website](https://accessibility-cookbook.com/)

## Structuring Documents

### Define the Natural Language

```html
<html lang="en"></html>

<p lang="de">Guten Tag</p>
```

```css
:lang(en){
    border: 1px solid red;
}
```

Benefits:

* Assistive technology. Screen readers can pick the correct language.
* Translation. Using lang property can tell the translator the correct language.
* Font selection. :lang pseudo-class to set different fonts for different languages.
* SEO. Help search engine with localization.

### Describe the Document

Using ```<title>``` element in HTML.

Best practices when writing page titles:

* The title must be unique. including SPA
* The title must be concise.
* The title must be descriptive. Describe the page's purpose.
* The relevant information comes first. Put page-specific details first
* Context-dependent information. Steps, Validation, Pages.

### Set the Viewport Width

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

width=device-width sets the viewport's width to the device's available width.

initial-scale=1 ensures the default zoom level is at 100%.

Don't disable zoom except you have good reason.

### Optimize Rendering Order

```html
<head>
  <!-- Character encoding -->
  <meta charset="UTF-8">

  <!-- Viewport meta tag -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CSP headers -->
  <meta http-equiv="Content-Security-Policy" content="upgrage-insecure-requests">
  
  <!-- Page title -->
  <title>Johanna's toy store</title>

  <!-- preconnect -->
  <link rel="preconnect" href="#" />

  <!-- Asynchronous JavaScript -->
  <script src="" async></script>

  <!-- CSS that includes @import -->
  <!-- Avoid @import in CSS -->
  <style>
    @import "file.css";
  </style>  

  <!-- Synchronous JavaScript -->
  <script src=""></script>

  <!-- Synchronous CSS -->
  <link rel="stylesheet" href="/assets/style.css">  

  <!-- preload -->
  <link rel="preload" href="#" />

  <!-- Deferred JavaScript -->
  <script type="module">document.documentElement.classList.replace('no-js', 'js');</script>
  <script src="" defer></script>

  <!-- prefetch / prerender -->
  <link rel="prefetch" href="#" />
  <link rel="prerender" href="#" />

  <!-- Everything else (meta tags, icons, open graphs, etc.) -->
  <meta name="description" content="">
</head>
```

Synchronous JavaScript comes before CSS because CSS blocks the excution of subsequent JavaScript.

### Structure the Document

Use landmarks: regions that represent the organization and structure of a web page.

```html
<header>
    <!-- banner landmark -->
    <nav>
        <!-- nav landmark -->
    </nav>
</header>
<main>
    <!-- main landmark -->
</main>
<footer>
    <!-- footer landmark -->
</footer>
```

## Structuring Pages

### Create Navigation Landmarks

* Main navigation
* Breadcrumb Navigation
* Local Navigation

```html
Local Navigation:

<nav aria-label="Contents">
  <ol>
    <li><a href="#company">Company</a></li>
    <li><a href="#licensing">Licensing</a></li>
    <li><a href="#seealso">See Also</a></li>
    <li><a href="#References">References</a></li>
    <li><a href="#externallinks">External links</a></li>
  </ol>
</nav>
```

### Create Form Landmarks

```html
<form role="search">
  <label for="site-search">Search</label>
  <input type="text" id="site-search">
</form>
```

Turn an essestial form into landmark by set role="search".

### Label Landmarks

Label landmarks with **aria-label** or **aria-labelledby** to differentiate landmarks with the same type.

```html
<nav aria-label="Main">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/products" aria-current="page">Products</a></li>
    <li><a href="/team">Team</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<nav aria-label="Page">
  <ol>
    <li><a href="#company">Company</a></li>
    <li><a href="#licensing">Licensing</a></li>
    <li><a href="#seealso">See Also</a></li>
    <li><a href="#References">References</a></li>
    <li><a href="#externallinks">External links</a></li>
  </ol>
</nav>
```

### Structure the Main Content

Using landmarks and other elements like headings and lists to provide structure for main content.

* section. Labeling the section element turns it into a landmark.
* aside
* list. ul/ol

### Create a Sound Document Outline

Using headings to create an outline for the document.

### Present Content in Order

Structure page content from top to bottom to make sense, even when presented without CSS.

A typical mistake is following the visual presentation of elements in the design without paying enough attention to the logical order within the page. We can use CSS to reorder elements visually.

## Linking Content

### Pick the Right Element

If it takes you somewhere else, use a link. If you submit a form or run JavaScript, use a button.

### Style Links

### Create Email Links

Show the email address directly and link it using the mailto: URI scheme.

```html
<a href="mailto:jiangshanmeta@qq.com">
    jiangshanmeta@qq.com
</a>
```

### Link Images

Use the alt attribute of the image to provide the link's label or accessible name.

```html
<a href="/">
    <img src="/images/logo.svg" alt="Home page" />
</a>
```

### Inform Users of Changing Context

If opening a link in a new tab or window will improve the user experience and you use target="_blank" on a link, you should inform users in the link text that the link will open in a new tab.

```html
<a href="https://github.com" target="_blank">
    Github (opens in new tab)
</a>
```

## Performing Actions

This chapter focuses on button.

### Pick the Right Element

A button becomes a submit button when you set its type to submit or in the context of a form. You usually use a submit button to send form data to a server.

If you set the type to button, the button does nothing. You do that if you want to run JavaScript when the user activates the button.

### Label Buttons Clearly

If the button contains text, that text serves as its label.

```html
<button type="button">
    Download
</button>
```

If the button contains an image, that image's alt attribute should provide the label.

```html
<button type="button">
    <img src="/images/download.svg" alt="Download" />
</button>
```

You can also remove the graphic from the accessibility tree by defining an empty alt attribute on the img or aria-hidden="true" on the SVG. If you do that, the button still needs a text alternative, which you can provide with visually hidden text, aria-labelledby, or aria-label.

```html
<button type="button" aria-label="Save">
    <svg aria-hidden="true" >
        
    </svg>
</button>
```

Removing nested graphics from the accessibility tree is also helpful when you combine an icon with text because the text eliminates the need for an extra label for the icon.

```html
<button type="button">
    Save
    <img src="/images/download.svg" alt="" />
</button>
```

### Add States and Properties

A button that toggles the visibility of another element needs to communicate whether the element is expanded. (expanded)

```html
<nav>
    <button aria-expanded="false" aria-controls="main_nav">
        Navigation
    </button>

    <ul id="main_nav"></ul>
</nav>
```

A button that turns a setting on or off must communicate whether it's active. (toggle)

```html
<button type="button" aria-pressed="true">
    Add to favorites
</button>
```

A button that toggles a setting must communicate whether it's active. (switch)

```html
<button role="switch" aria-checked="false">
    Functional cookies
</button>
```

A button can communicate its state and what kind of element it controls.

```html
<button 
    type="button" 
    aria-haspopup="menu" 
    aria-expanded="false"
>
    Settings
</button>

<ul role="menu" hidden>
    <li role="none">
        <button role="menuitem">Print</button>
    </li>
    <li role="none">
        <button role="menuitem">Save</button>
    </li>
</ul>
```

You use ```aria-expanded``` attribute on a button element to indicate whether a grouping element it controls is expanded or collapsed.

The ```aria-controls``` attribute identifies the element the button controls.

The ```aria-pressed``` attribute indicates the current "pressed" state of toggle buttons.

The ```aria-checked``` attribute indicates the current "checked" state of checkboxes, radio buttons and other widgets.

The ```aria-haspopup``` attribute indicates that a button controls another interactive popup element. The value indicates the role of the referenced element.

## Styling Content

### Work with Color

* Use tools to test color contrast
* Don't use color alone to indicate an action. Promote a response, visualize a change of state, or distinguish a visual element.

```html
<div>
  <label for="email">Your e-mail address</label>
  <input type="email" id="email" required aria-invalid="true" value="kubidus21@" aria-describedby="error">

  <div id="error" class="error">
    <svg viewBox="0 0 640 640" width="16" fill="currentColor">
      <path d="M640 128 512 0 320 192 128 0 0 128l192 192L0 512l128 128 192-192 192 192 128-128-192-192 192-192z">
    </svg>

    Please enter a valid e-mail address
  </div>
</div>
```

### Respect User Preferences

Use media queries to retrieve browser and operating system setting.

```html
<style>
  html {
    --dark: oklch(37.34% 0.081 236.96);
    --light: oklch(98.89% 0.005 17.25);
    --background: var(--light);
    --text: var(--dark);
  }

  @media(prefers-color-scheme: dark) {
    html {
      --background: var(--dark);
      --text: var(--light);
    }
  }

  body {
    background-color: var(--background);
    color: var(--text);
  }
</style>
```

## Managing Focus

### Provide Focus Styles

Use pseudoclasses to style interactive elements in their focus or focus-visible state.

```html
<style>
:focus-visible {
  outline: 0.25em solid;
  outline-offset: 0.25em;
}
:focus {
  outline: 0.25em solid;
  outline-offset: 0.25em;
}
:focus-within {
  box-shadow: 0 0 10px 3px rgb(0 0 0 / 0.2);
}
</style>
```

The ```:focus``` pseudoclass applies when the user focuses an element using the keyboard, a mouse, or any other input form.

The ```:focus-visible``` pseudoclass applies to keyboard users.

```html
<style>
/* Styles for users of pointing devices, like mouse */
button:focus:not(:focus-visible) {
  outline: none;
  box-shadow: 1px 1px 5px rgba(1, 1, 0, .7);
}
</style>
```

The ```:focus-within``` pseudoclass applies to any element that matches the ```:focus``` pseudoclass. Most importantly, it applies to an element whose descendants match the condition for matching ```:focus```. That means you can use it to select an element that has children that are currently focused.

### Make Elements Focusable

* Using semantic HTML to avoid keyboard-accessibility issue. ( Using native button element rather than a div that looks like a button ).
* Using tabindex attribute. Use tabindex=-1 to make nonfocusable elements focusable via JavaScript only or to make focusable elements nonfocusable. Use tabindex=0 to make nonfocusable elements keyboard-focusable. Avoid using positive values.

### Move Focus

When you move the users' attention to another place or layer within the page ( for example, by showing modal dialog ), you must ensure they can also immediately interact without additional effort.

You have to move focus to where it's currently needed. That requires you to shift focus, remember where it was before, and return to that spot once the action is completed.

```html
<button class="open">Login</button>

<div role="dialog" aria-modal="true" hidden aria-labelledby="heading">
  <div>
    <button class="close">Close</button>
    <!-- the heading is only focusable via JavaScript  -->
    <h1 id="heading" tabindex="-1">Login</h1>
  </div>
</div>
```

Move focus:

```javascript
heading.focus();
```

Return to the button.

```javascript
button.focus();
```

### Keep Focus Contained

When you have focus inside a dialog modal, you keep the focus contained inside the dialog. You can add event listener to the dialog and prevent default action for tab keystroke.

```javascript
dialog.addEventListener("keydown", (e) => {
  if (e.code !== "Tab") return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];
  const active = document.activeElement;

  // shiftKey means move to the previous element.
  if (e.shiftKey) {
    if (first === active) {
      e.preventDefault();
      last.focus();
    }
  } else if (last === active) {
    e.preventDefault();
    first.focus();
  }
});
```

### Preserve Order

When you create layouts in CSS, let elements flow naturally on x- and y-axes.

Avoid using order property for flex item.

### Allow Users to Skip Elements

```html
<style>
.skip-link {
  background-color: #fff;
  position: absolute;
  padding: 0.2em;
  display: block;
}

.skip-link:not(:focus):not(:active) {
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
}
</style>

<header>
  <a href="#content" class="skip-link">Skip to content</a>
  <button>Header button 1</button>
  <button>Header button 2</button>
  <button>Header button 3</button>
  <button>Header button 4</button>
</header>
```

Skip links can be useful when there are a lot of interactive elements before the page's main content.

## Navigating Sites

### Highlight the Active Page

```html
<a href="/products" aria-current="page">Products</a>
```

### Announce the Number of Items

```html
<ul role="list">
  <li>
    <a href="/home">Home</a>
  </li>
  <li>
    <a href="/products" aria-current="page">Products</a>
  </li>
  <li>
    <a href="/team">Team</a>
  </li>
  <li>
    <a href="/contact">Contact</a>
  </li>
</ul>
```

Lists in HTML provide additional semantic information that tells users how many items in a list and which item in a set of items the user is currentlt accessing.

### Provide Quick Access

The main navigation is usually located in the page's header. Besides the navigation, there might be other components which lead to extra tab to reach the main navigation.

You can turn an ordinary list into a navigational list by wrapping the ```<ul>``` in a ```<nav>``` element. This adds useful semantic information to the navigation , and it allows screen reader users to jump directly into the main navigation.

```html
<nav aria-label="Main">
  <ul>
  
  </ul>
</nav>
```

Create Landmarks

## Toggling Content Visibility

### Hide Content

Suppose you want to hide content visually but keep it accessible to screen reader and keyboard users.

```css
.visually-hidden:not(:focus) {
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
```

Visually and semantically hidden

```css
.all-hidden {
  display: none;
}
```

Only semantically hidden:

```html
<img alt="" />
<svg aria-hidden="true"></svg>
```

### Create a Custom Disclosure Widget

```html
<div class="disclosure">
  <button aria-expanded="false" aria-controls="content">
    Show details
  </button> 

  <div class="disclosure-content" id="content">
    <p>Detailed content goes here…</p>
  </div>
</div>
```

The ```aria-expanded``` attribute tells assistive techonology if the element the button controls is expanded.

The ```aria-controls``` creates a reference to the element it controls.

### Create Groups of Disclosure Widgets

Create Accordion Component

## Constructing Forms

### Identify Form Elements

Provide a (visible) label for form controls.

```html
<label for="username">Username</label>
<input type="text" id="username" autocomplete="username">
```

### Describe Form Fields

Provide additional information like hints.

### Highlight Erroneous Fields

```html
<label for="email">Your e-mail address</label>
<input type="email" id="email" required aria-invalid="true" value="" 
       aria-describedby="error">
<div id="error" class="error">
  Please enter a valid e-mail address
</div>
```

The ```aria-invalid="true"``` makes the field as invalid

The ```aria-describedby``` reference the hint and the error message.

## Presenting Tabular Data

### Pick the Right Elements

Use tables only when you have data with more than one dimension. Don't use tables for layout.

### Structure Tables

* Use caption to label a table
* Use th in thead to label a column
* Use th in tbody to label a row

```html
<table>
  <caption>Total scores Group A</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Q1</th>
      <th>Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Michael</th>
      <td>47</td>
      <td>28</td>
    </tr>
    <tr>
      <th>Robert</th>
      <td>97</td>
      <td>13</td>
    </tr>
    <tr>
      <th>Dominik</th>
      <td>29</td>
      <td>28</td>
    </tr>
    <tr>
      <th>David</th>
      <td>61</td>
      <td>11</td>
    </tr>
    <tr>
      <th>Markus</th>
      <td>72</td>
      <td>70</td>
    </tr>
    <tr>
      <th>Paul</th>
      <td>122</td>
      <td>100</td>
    </tr>
  </tbody>
</table>
```

### Add Interactive Elements

Tables sometimes contain interactive elements, such as buttons.

These buttons are labelled by text in the buttons, but they are not distinguishable sometimes. We can use aria-labelledby attribute to label these buttons because it has higher priority. And aria-labelledby supports multi ids as value.

```html
<tr>
  <td id="name1">Michael</td>
  <td>27</td>
  <td>
    <button id="details1" aria-labelledby="details1 name1">Details</button>
  </td>
</tr>
```

### Sort Columns

```html
<th aria-sort="ascending">
  <button>
    Score
    <!-- icon to indicate order -->
  </button>
</th>
```

Put the aria-sort attribute on the table header of the sorted column.

## Creating Custom Elements

This chapter talks about web components.

### Working with IDs

It's impossible to reference an element from Light DOM in Shadow DOM, or vice versa.

In a form, put both the label and form field in Light DOM or both in Shadow DOM, but don't mix the two contexts.

```html
<the-input></the-input>

<script>
  class TheInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    // both in shadow DOM
    this.shadowRoot.innerHTML = `
      <label for="email">E-Mail</label>
      <input type="email" id="email" />
    `
  }
}

customElements.define("the-input", TheInput);
</script>
```

### Creating ARIA References

Attributes like aria-labelledby use IDs to reference one or multiple other elements.

Create ARIA references in Light DOM or in Shadow DOM only, but don't mix contexts.
