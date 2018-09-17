import {
  animation,
  group,
  query,
  style,
  animate,
  trigger,
  state,
  transition
} from "@angular/animations";

export const animationTimeConfigs = {
  routerOpacityTransition: "0.5s ease-in-out",
  discountPrice: "1000ms ease-in",
  fadeOtherPrices: "500ms ease-in",
  slideInOutEditableSection: "400ms ease-out",
  modalAnimation: "500ms ease-out"
};

export const Animations = {
  discountPrice: discountPrice,
  fadeOtherPrices: fadeOtherPrices,
  slideInOutEditableSection: slideInOutEditableSection,
  animateModal: animateModal
};

export const routeTransition = animation([
  group([
    query(
      ":enter",
      [
        style({ opacity: 0 }),
        animate(
          animationTimeConfigs.routerOpacityTransition,
          style({ opacity: 1 })
        )
      ],
      { optional: true }
    ),
    query(
      ":leave",
      [
        style({ opacity: 1 }),
        animate(
          animationTimeConfigs.routerOpacityTransition,
          style({ opacity: 0 })
        )
      ],
      { optional: true }
    )
  ])
]);

export function discountPrice() {
  return trigger("discount", [
    state(
      "inactive",
      style({
        color: "black",
        textDecoration: "none"
      })
    ),
    state(
      "active",
      style({
        color: "red",
        textDecoration: "line-through"
      })
    ),
    transition(
      "inactive => active",
      animate(animationTimeConfigs.discountPrice)
    )
  ]);
}

export function fadeOtherPrices() {
  return trigger("fadeOtherPrices", [
    state(
      "inactive",
      style({
        opacity: 0,
        transform: "scale(1)"
      })
    ),
    state(
      "active",
      style({
        opacity: 1,
        transform: "scale(1.1)"
      })
    ),
    transition(
      "inactive => active",
      animate(animationTimeConfigs.fadeOtherPrices)
    )
  ]);
}

export function slideInOutEditableSection() {
  return trigger("slideInOut", [
    state(
      "in",
      style({
        overflow: "hidden",
        height: "*"
      })
    ),
    state(
      "out",
      style({
        opacity: "0",
        overflow: "hidden",
        height: "0px"
      })
    ),
    transition(
      "in => out",
      animate(animationTimeConfigs.slideInOutEditableSection)
    ),
    transition(
      "out => in",
      animate(animationTimeConfigs.slideInOutEditableSection)
    )
  ]);
}

export function animateModal(animationName?: string) {
  return trigger(animationName ? animationName : "animateModal", [
    state("void", style({ transform: "translate(0, -25%)" })),
    state("show", style({ transform: "translate(0, 0)" })),
    transition("* => show", [animate(animationTimeConfigs.modalAnimation)])
  ]);
}
