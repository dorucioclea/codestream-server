
export CS_OUTBOUND_EMAIL_ASSET_ENV=pd
#SENDGRID_CREDENTIALS_FILE=$HOME/.codestream/sendgrid/development
PUBNUB_KEY_FILE="$HOME/.codestream/pubnub/CodeStream-Development-PD_Keyset"
MONGO_ACCESS_FILE="$HOME/.codestream/mongo/pd-codestream-api"
export CS_OUTBOUND_EMAIL_SQS=pd_outboundEmail

. $CS_OUTBOUND_EMAIL_TOP/sandbox/defaults.sh

unset CS_OUTBOUND_EMAIL_TO
export CS_OUTBOUND_EMAIL_REPLY_TO_DOMAIN=pd.codestream.com
export CS_OUTBOUND_EMAIL_LAMBDA_TEMPLATE=lambda-func.generic.template.json
export CS_OUTBOUND_EMAIL_LAMBDA_SUBNETS='"subnet-c538ff98","subnet-2730ae43"'
export CS_OUTBOUND_EMAIL_LAMBDA_SECURITY_GROUPS='"sg-32387241"'
