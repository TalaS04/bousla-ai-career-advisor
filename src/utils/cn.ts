/**
 * `cn` — conditionally join CSS class names into a single string.
 *
 * Parameters:
 *   ...classes — any number of class-name fragments. Each one may be a
 *     string, or a "falsy" value (false, null, undefined, or an empty
 *     string) produced by an inline condition such as
 *     `isActive && "text-primary"`.
 *
 * Return value:
 *   A single space-separated string containing only the truthy fragments,
 *   ready to pass to the `className` prop.
 *
 * Why this helper exists:
 *   React components very often need to combine a base set of Tailwind
 *   classes with a few conditional ones, e.g.:
 *
 *     className={cn("rounded-md px-4 py-2", isActive && "bg-primary")}
 *
 *   Without a helper, this becomes an error-prone template string full of
 *   `${condition ? "a" : ""}` fragments and stray double spaces. Popular
 *   projects reach for the `clsx` npm package to solve exactly this, but the
 *   logic is about five lines of plain JavaScript — pulling in a dependency
 *   for it would violate the "no unnecessary npm packages" rule for this
 *   project, so we implement the same behavior by hand.
 *
 * Where it is expected to be reused:
 *   Anywhere a component's className is built conditionally — this is most
 *   UI components (Button, NavLink, Card variants, etc.) across the app.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
