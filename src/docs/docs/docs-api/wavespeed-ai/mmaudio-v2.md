# /docs/docs-api/wavespeed-ai/mmaudio-v2

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/mmaudio-v2

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Mmaudio V2

# Mmaudio V2

Mmaudio V2

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/mmaudio-v2)

MMAudio generates synchronized audio given video and/or text inputs. It can be combined with video models to get videos with audio.

## Features[](#features)

# MMAudio Video-to-Audio Synthesis Model 🎵

A powerful video-to-audio synthesis model (based on MMAudio V2) that transforms visual content into rich, contextually appropriate audio. This model specializes in generating high-quality audio that matches the visual elements, actions, and environments in source videos while maintaining temporal consistency.

## Implementation ✨[](#implementation-)

, focusing on:

*   High-fidelity audio generation matching visual content
*   Real-time synchronization with video events
*   Environmental sound synthesis
*   Action-to-sound mapping

## Model Description 🎧[](#model-description-)

The model employs the sophisticated deep learning architecture of MMAudio V2, designed specifically for video-to-audio synthesis. Using advanced neural networks and temporal analysis, it processes visual information to generate corresponding audio that naturally fits the content.

## Key features:[](#key-features)

*   🎵 High-quality audio synthesis from video
*   🎭 Context-aware sound generation
*   ⏱️ Precise temporal synchronization
*   🌍 Rich environmental audio synthesis
*   🎯 Accurate action-sound mapping
*   🔄 Works with diverse video sources

## Predictions Examples 🌟[](#predictions-examples-)

The model excels at transformations like:

*   Converting silent films to audio-enhanced versions
*   Adding environmental sounds to nature videos
*   Generating appropriate sound effects for action sequences
*   Creating ambient audio for different settings
*   Synthesizing speech-like sounds for speaking figures

## Limitations ⚠️[](#limitations-️)

*   Processing time increases with video length
*   Complex acoustic environments may require additional processing
*   Output quality depends on input video clarity
*   Some unique sound effects may need specialized handling
*   Resource requirements scale with video complexity
*   Performance varies with rapid scene changes

# Applications 🎯

MMAudio provides valuable solutions for:

*   Film and video post-production
*   Silent film restoration
*   Educational content enhancement
*   Gaming and VR sound design
*   Accessibility improvements
*   Content creation and editing

# Ethical Considerations 📝

Important points to consider:

*   Respect original content rights
*   Maintain transparency about AI-generated audio
*   Consider potential misuse implications
*   Provide appropriate attribution
*   Follow content creation guidelines

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/mmaudio-v2" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "num_inference_steps": 25,
    "duration": 8,
    "guidance_scale": 4.5,
    "mask_away_clip": false
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

video

string

Yes

\-

The URL of the video to generate the audio for.

prompt

string

Yes

\-

The positive prompt for the generation.

negative\_prompt

string

No

\-

The negative prompt for the generation.

num\_inference\_steps

integer

No

25

4 ~ 50

The number of inference steps to perform.

duration

integer

No

8

1 ~ 30

The duration of the generated media in seconds.

guidance\_scale

number

No

4.5

0 ~ 20

The guidance scale to use for the generation.

mask\_away\_clip

boolean

No

false

\-

Whether to mask away the clip.

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

[Minicpm V Video](/docs/docs-api/wavespeed-ai/minicpm-v-video "Minicpm V Video")[Multitalk](/docs/docs-api/wavespeed-ai/multitalk "Multitalk")