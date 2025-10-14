# /docs/docs-api/bytedance/bytedance-avatar-omni-human

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-avatar-omni-human

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")BytedanceBytedance Avatar Omni Human

# Bytedance Avatar Omni Human

Bytedance Avatar Omni Human

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/avatar-omni-human)

Transform your portrait photos into dynamic avatar videos with OmniHuman technology. Create realistic human motion and expressions from a single portrait image. 0.12$ per second.

## Features[](#features)

# OmniHuman

OmniHuman is a cutting-edge end-to-end AI framework developed by ByteDance, designed to generate highly realistic human videos from just a single image and an audio input, with advanced features such as lip sync, facial animation, and gesture synthesis. Whether you provide a portrait, half-body, or full-body photo, OmniHuman brings it to life with natural movements, expressive gestures, accurate lip synchronization to audio, and remarkable attention to detail. By combining multiple input types—such as images and audio—OmniHuman creates vivid, high-quality video results. The model is highly adaptable, supporting not only real human portraits but also animated or cartoon characters, making it suitable for a wide range of applications including content creation, singing, lip sync videos, and performance scenarios. 0.12$ per second.

# OmniHuman Avatar Effect

## Requirements[](#requirements)

### Number of Images[](#number-of-images)

*   Only one image can be uploaded per generation.

### Image Requirements[](#image-requirements)

*   Only human portrait images are supported.
*   For best results, use clear, front-facing portraits with good lighting.
*   Supported formats: PNG, JPEG, JPG, WebP.
*   Maximum file size: 50MB.

### Output Characteristics[](#output-characteristics)

*   Produces natural human motion, facial expressions, and accurate lip sync to audio.
*   Works best with clear, well-lit portrait photos.
*   May not perform optimally with extreme poses or poor lighting.

## Best Practices[](#best-practices)

1.  Use a clear, front-facing portrait photo.
2.  Ensure the image is well-lit.
3.  Avoid extreme angles or poses.
4.  Make sure the face is clearly visible.
5.  Avoid images with multiple people.

## Keywords[](#keywords)

*   lip sync
*   facial animation
*   gesture synthesis
*   portrait animation
*   audio-driven video generation

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/avatar-omni-human" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
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

image

string

Yes

\-

The portrait image to animate, can be a URL or base64 encoded image. Better results with clear, front-facing portraits with good lighting.

audio

string

Yes

\-

\-

Optional background audio for the generated video, can be a URL or base64 encoded audio file.

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

[Alibaba Wan 2.5 Text To Video Fast](/docs/docs-api/alibaba/alibaba-wan-2.5-text-to-video-fast "Alibaba Wan 2.5 Text To Video Fast")[Bytedance Avatar Omni Human 1.5](/docs/docs-api/bytedance/bytedance-avatar-omni-human-1.5 "Bytedance Avatar Omni Human 1.5")