import * as React from "react";
import { User } from "lucide-react";
import { AvatarSize, AvatarStatus } from "../../constants/enum";
import { avatarVariants, type AvatarVariants } from "./avatar.variants";
import { cn } from "../../utils/cn";

const ICON_SIZE_MAP: Record<AvatarSize, number> = {
  [AvatarSize.Sm]: 16,
  [AvatarSize.Md]: 20,
  [AvatarSize.Lg]: 24,
  [AvatarSize.Xl]: 32,
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  fallbackIcon?: React.ReactNode;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "",
      initials,
      fallbackIcon,
      size = AvatarSize.Md,
      status,
      className,
      ...props
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);

    React.useEffect(() => {
      setImgError(false);
    }, [src]);

    const showImage = src && !imgError;
    const showIndicator = status === AvatarStatus.Online;

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        role="img"
        aria-label={alt || initials || "Avatar"}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
            draggable={false}
          />
        ) : initials ? (
          <span className="kz-avatar-initials" aria-hidden="true">
            {initials}
          </span>
        ) : (
          <span className="kz-avatar-fallback-icon" aria-hidden="true">
            {fallbackIcon ?? <User size={ICON_SIZE_MAP[size]} />}
          </span>
        )}

        {showIndicator && (
          <span
            className={cn("kz-avatar-status", `kz-avatar-status--${size}`)}
            aria-label="Online"
            role="status"
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
export type { AvatarVariants };
