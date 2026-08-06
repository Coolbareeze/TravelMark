// react-icons ships types at its package root (react-icons/lib/index.d.ts),
// but subpath imports like "react-icons/fa" are sometimes not picked up by
// TypeScript depending on the package manager/resolution mode. This shim
// guarantees `import { FaWhatsapp } from "react-icons/fa"` always type-checks.
declare module "react-icons/fa" {
  import type { ComponentType, SVGAttributes } from "react";
  type IconType = ComponentType<SVGAttributes<SVGElement> & { size?: string | number; title?: string }>;
  export const FaWhatsapp: IconType;
}
