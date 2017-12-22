# HTML/SASS

## BEM methodology
Apply [bem methodology](https://en.bem.info/methodology/quick-start/) in naming and organizing your code.

###Naming conventions

We use three types of block levels, components, layouts and ui, and corresponding block level abreviations `.c-`, `.l-` and
`.ui-`. `.js-` is a special abbreviation used for classes that have some javascript logic tied to them and usually you are
not applying any style trough it, it is only there to serve as a hook for js code. Another exception form this rule if the project
is supposed to be serving several vendors, then each block is prefixed with vendor abbreviation, i.e. `.oi-c-`. After that
comes the name of the block, which in the case of the components will be the name of the component itself - namespace of
the css matches with namespace of the component. Element level of the component is separated from the block with `__` (double underscore) and
modifier with `--` (double dashes), i.e. `c-navigation__item--active`.

###Code structure

**Nesting**

All elements of the same block are nested inside the block. This is to make sure that the class will not be used in any 
other component thus polluting the namespace. Exception from this rule are `.l-` classes and components. Also, all elements are nested
exactly one level deep, even though in html they might be nested inside other elements.

Example:

```SCSS
/* sass */

.c-navigation {
    background-color: $primary;
    height: 50px;
    
    &__item {
        border-right: 1px solid $primaryPale;
        display: inline-block;
    }
    
    &__link {
        color: $link;
        padding: 30px;
    }
}
```
```HTML
/* html */
<ul class="c-navigation">
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
</ul>
```

Bad example:

```SCSS
.c-navigation {
    background-color: $primary;
    height: 50px;
}

.c-navigation__item { // placed outside the block level
    border-right: 1px solid $primaryPale;
    
    .c-navigation__link { // not directly under the block element
        color: $link;
        padding: 30px;
    }
}
```

There can only be three levels of nested code. Exception from this rule are the pseudo classes (`:after, :before, :hover, :focus`).
Meaning that there can't be more than one modifier class per element, but pseudo classes are allowed one level deep.

Bad example:
```SCSS
.c-navigation {
    &__item {
        &--active {
            &--first { //there should not be more than one modifier per element
               
            }
        }
    }
}
```

Good example:
```SCSS
.c-navigation {
    &__item {
        &--active {
        
        }
        &--first {
            &:hover {
                
            }
        }
    }
}
```

**Discouraged selectors**

Avoid using selectors that are targeting html elements based on their state in the DOM, namely `:first-child`, 
`:last-child`, `:disabled`, `nth-child()`. To target these, output the appropriate modifier class in the html, and then 
apply styling rules for them as modifiers of the element.

Bad Example:
```HTML
/* html */
<ul class="c-navigation">
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
</ul>
```
```SCSS
/* sass */

.c-navigation {
    &__item {
        &:first-child {
            color: $link-first;
        }
    }
}
```

Good Example: 
```HTML
/* html */
<ul class="c-navigation">
    <li class="c-navigation__item c-navigation__item--first-item"> //render modifier class in html
        <a class="c-navigation__link">Nav link</a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link">Nav link</a>
    </li>
</ul>
```
```SCSS
/* sass */

.c-navigation {
    &__item {
        &--first-item { //style modifier classs
            color: $link-first;
        }
    }
}
```


**Tags and classes**

Never style naked tags in sass. If something needs to be styled it must have an element class assigned, and only that class
can be styled. This is to avoid conflicts with other elements inside the block.

Bad example:
```SCSS
/* html */
<ul class="c-navigation">
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span>Nav link</span></a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span>Nav link</span></a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span>Nav link</span></a>
    </li>
</ul>

/* sass */
.c-navigation {
    span {
        color: $link
    }
}
```
Good example:
```HTML
/* html */
<ul class="c-navigation">
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span class="c-navigation__text">Nav link</span></a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span class="c-navigation__text">Nav link</span></a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span class="c-navigation__text">Nav link</span></a>
    </li>
</ul>
```
```SCSS
/* sass */
.c-navigation {
    &__text {
        color: $link
    }
}
```

**Avoid cascading rules**

By its nature BEM methodology is deliberately ignoring the cascading nature of CSS and trading it for code maintainability 
and scalability in the log run. In practice this means that you should always try to apply rules on elements and classes 
where they will be rendered, and not on the container level. This rule is not strict, and you should use your best 
judgment when to break from it.

Bad example:

```SCSS
.c-navigation {
    color: $link //color will be applyed on text elements inside the .c-navigation so it is better to set this rule on them 
}
```

Good example 
```SCSS
.c-navigation {
    &__item {
        color: $link
    }
}
```
**Parent Modifiers**
There will be situations where you will want to apply different rules on the block or element depending on the state of the parent 
component, but you will not be able to render the modifier class on the block or element, or it will require expensive or 
not so scalable solution. To overcome this situation, instead of styling the block as a child of a parent component, 
style the block in its own component file with the parent class as a selector:

Bad example:
```SCSS

/* header.scss */

.c-header {

    &--collapsed {
        .c-navigation { // navigation component is styled inside header component file
            display: none
        }
    }
}
```

Good example:

```SCSS
.c-navigation {

    .c-header--collapsed & { //parrent modifier inside navigation file
        display: none;
    }
}
```

**No overrieds**

In a situation where you applied the rule on the container level for all children, and then after some time you need to 
apply a different rule to the subset of children items don't use the override pattern, it will get out of hand.

Bad example:
```HTML
/* html */
<ul class="c-navigation">
    <li class="c-navigation__logo-text">Lorem Ipsum</li>
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span class="c-navigation__text">Nav link</span></a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span class="c-navigation__text">Nav link</span></a>
    </li>
    <li class="c-navigation__item">
        <a class="c-navigation__link"><span class="c-navigation__text">Nav link</span></a>
    </li>
</ul>
```
``` SCSS
/* sass */

.c-navigation {
    color: $link;
    
    &__logo-text {
        color: $text //overrides the container rule
    }
}
```
Good Example:
```SCSS
/* sass */

.c-navigation {
    &__navigation-item {
        color: $link;
    }
    
    &__logo-text {
        color: $text
    }
}
```

**Media Queries**

1) You should always have your breakpoints defined in a variables.scss file. Naming and sizes decided on project basis.

```SCSS
$breakpoint: (
  default:                    320px,  
  xxsmall:                    375px,
  xsmall:                     480px,
  small:                      568px,
  medium:                     768px,
  large:                      1024px,
  xlarge:                     1180px
);
```

2) When doing responsive use mixins for responsive inside of the style block. Responsive mixins don't follow the 3 layer deep rule.

Good Example: 
```SCSS
.navigation {
    @include responsive(large) {
        display: block;
        background-color: black;
    }

    &__item {
        width: 100%;

        @include responsive(large) {
            width: 200px;
        }

        &--first {
            color: $white;
            @include responsive(large) {
                color: $black;
            }
        }
    }
}
```

Bad Example: 
```SCSS
.navigation {
    @include responsive(large) {
        display: block;
        background-color: black;

        &__item {
            width: 200px;
        

            &--first {
                color: $white;
            }
        }
    }
}
```

Bad example (At the end of scss file)
```SCSS
@include responsive(large) {
    .navigation{
        display: block;
        background-color: black;
        &__item {
            width: 200px;
            &--first {
                color: $white;
            }
        }
    }
    
}
```