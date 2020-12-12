export const MORGAN_LOG_FORMAT = `:correlationId \
:req[x-forwarded-for] \
":method :url" \
:status \
":referrer" \
":user-agent" \
:total-time ms`;
