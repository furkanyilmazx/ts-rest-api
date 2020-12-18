export const MORGAN_LOG_FORMAT = `:req[x-forwarded-for] \
":method :url" \
:status \
":referrer" \
":user-agent" \
:total-time ms`;
