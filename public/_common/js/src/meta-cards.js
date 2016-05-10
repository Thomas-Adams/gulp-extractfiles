var cards = {
    "cards": {
        "$cards-flex-display": "flex",
        "$cards-flex-wrap": "wrap",
        "$cards-justify-content": "space-between"
    },

    "card": {
        "$base-border-color": "gainsboro !default",
        "$base-border-radius": "3px !default",
        "$base-background-color": "white !default",
        "$base-spacing": "1.5em !default",
        "$action-color": "#477DCA !default",
        "$dark-gray": "#333 !default",
        "$base-font-color": "$dark-gray !default",
        "$card-border-color": "$base-border-color",
        "$card-border": "1px solid $card-border-color",
        "$card-background": "lighten($card-border-color, 10%)",
        "$card-header-background": "$card-background",
        "$card-margin": "1em",
        "$card-image-hover-opacity": "0.7",
        "$card-image-hover-color": "#F8F2B4",
        "$card-top-position": "35%",
        "$card-left-position": "null",
        "$card-bottom-position": "null",
        "$card-right-position": "null",
        "$card-flex-basis": "15em",
        "$card-flex-grow": "1",
        "$card-box-shadow": "0 2px 4px darken($base-background-color, 10 % )"
    },
    "&:focus,&:hover": {
        "cursor": "pointer"
    },
    "&:active": {
        "background-color": "$card-background"
    },
    "card-header": {
        "$card-header-line-height": "1.5em",
        "$card-header-font-weight": "bold",
        "border-radius": "$base-border-radius $base-border-radius 0 0",
        "background-color": "$card-header-background",
        "border-bottom": "$card-border",
        "padding": "($base-spacing / 3) ($base-spacing / 2)",
        "background-color-active": "$card-background"
    },
    "card-image": {
        "overflow": "hidden",
        "height": "$card-image-img-width",
        "max-height": "$card-image-max-height",
        "background-color": "$card-image-hover-color"
    },
    "img": {
        "border-top-left-radius": "$base-border-radius",
        "border-top-right-radius": "$base-border-radius",
        "width": "100%",
        "opacity": "1",
        "opacity-focus": "$card-image-hover-opacity"
    },
    "card-copy": {
        "font-size": "$card-copy-font-size",
        "line-height": "$card-copy-line-height",
        "padding": "($base-spacing / 2) ($base-spacing / 2)"
    },
    "p": {
        "margin": "0 0 ($base-spacing / 2)"
    }
};
