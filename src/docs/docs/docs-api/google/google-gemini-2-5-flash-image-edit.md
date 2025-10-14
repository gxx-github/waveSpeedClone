# /docs/docs-api/google/google-gemini-2.5-flash-image-edit

来源: https://wavespeed.ai/docs/docs-api/google/google-gemini-2.5-flash-image-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")GoogleGoogle Gemini 2.5 Flash Image Edit

# Google Gemini 2.5 Flash Image Edit

Google Gemini 2.5 Flash Image Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/gemini-2.5-flash-image/edit)

Nano Banana AI delivers revolutionary image-to-image generation and editing with deep reasoning capabilities, outperforming competitors in accuracy, consistency.

## Features[](#features)

Nano Banana AI delivers revolutionary image-to-image generation and editing with deep reasoning capabilities, outperforming competitors in accuracy, consistency.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/gemini-2.5-flash-image/edit" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "output_format": "jpeg",
    "enable_sync_mode": false,
    "enable_base64_output": false
}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/api/v3/predictions/${requestId}/result" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}"
```

## Parameters[](#parameters)

### Task Submission Parameters[](#task-submission-parameters)

#### Request Parameters[](#request-parameters)

Parameter

Type

Required

Default

Range

Description

prompt

string

Yes

\-

The positive prompt for the generation.

images

array

Yes

\[\]

\-

List of URLs of input images for editing. Up to 10 images can be provided.

aspect\_ratio

string

No

\-

1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

The aspect ratio of the generated media.

output\_format

string

No

jpeg

jpeg, png

The format of the output image.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

#### Response Parameters[](#response-parameters)

Parameter

Type

Description

code

integer

HTTP status code (e.g., 200 for success)

message

string

Status message (e.g., “success”)

data.id

string

Unique identifier for the prediction, Task Id

data.model

string

Model ID used for the prediction

data.outputs

array

Array of URLs to the generated content (empty when status is not `completed`)

data.urls

object

Object containing related API endpoints

data.urls.get

string

URL to retrieve the prediction result

data.has\_nsfw\_contents

array

Array of boolean values indicating NSFW detection for each output

data.status

string

Status of the task: `created`, `processing`, `completed`, or `failed`

data.created\_at

string

ISO timestamp of when the request was created (e.g., “2023-04-01T12:34:56.789Z”)

data.error

string

Error message (empty if no error occurred)

data.timings

object

Object containing timing details

data.timings.inference

integer

Inference time in milliseconds

#### Result Request Parameters[](#result-request-parameters)

[Bytedance Waver 1.0](/docs/docs-api/bytedance/bytedance-waver-1.0 "Bytedance Waver 1.0")[Google Gemini 2.5 Flash Image Preview Edit](/docs/docs-api/google/google-gemini-2.5-flash-image-preview-edit "Google Gemini 2.5 Flash Image Preview Edit")