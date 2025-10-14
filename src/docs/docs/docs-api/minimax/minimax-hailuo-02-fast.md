# /docs/docs-api/minimax/minimax-hailuo-02-fast

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-hailuo-02-fast

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")MinimaxMinimax Hailuo 02 Fast

# Minimax Hailuo 02 Fast

Minimax Hailuo 02 Fast

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/hailuo-02/fast)

Hailuo 02 Fast - Revolutionary AI Model for Image-to-Video Generation. Fast, High-Quality, and Affordable. Generate 6s and 10s videos in 512p resolution. Perfect for creators, marketers, and entrepreneurs.

## Features[](#features)

MiniMax Hailuo 02 Fast This is a fast version of Hailuo 02 that can generate videos in 6s and 10s at 512p resolution.

Hailuo 02 is a new AI video generation model, from Hailuo AI, created on MiniMax’s evolving framework. It has been fine-tuned to deliver ultra-clear 1080P resolution and unprecedented responsiveness while even handling, the craziest of physics driven scenes.

Indeed, artists have discovered that for highly intricate scenarios, such as gymnastics, MiniMax Hailuo 02 is currently the only model globally capable of delivering such performance. We eagerly invite the community to explore and unlock even more creative possibilities.

Our journey began late last August when we informally launched a demo webpage showcasing an early version of our video generation model. To our surprise, it attracted significant attention and acclaim from talented creators worldwide. This pivotal moment led to the development of Hailuo Video 01, our AI native video generation product, which has since empowered creators to generate over 370 million videos globally.

Returning to our foundational principle of “Intelligence with Everyone,” our ambition is to equip global creators to fully unleash their imagination, elevate the quality of their video content, and lower the barriers to video creation. Crucially, we strive to achieve this without imposing prohibitive costs that would limit the widespread accessibility of this technology.

To this end, our team embarked on a quest to develop a more efficient video generation model architecture. This pursuit culminated in the core framework of MiniMax Hailuo 02, which we’ve named Noise-aware Compute Redistribution (NCR). In essence, the new architecture’s central idea is as follows:

At a comparable parameter scale, the new architecture boosts our training and inference efficiency by 2.5 times. This significant gain enables us to implement a much larger parameter model—thereby enhancing its expressive capabilities—without increasing costs for creators. This approach also leaves ample room for inference optimization. We ultimately expanded the model’s total parameter count to 3 times that of its predecessor.

A larger parameter count and heightened training efficiency mean our model can learn from a more extensive dataset. The wealth of feedback from Hailuo 01 provided invaluable guidance for our model training strategy. As a result, we expanded our training data volume by 4 times, achieving significant improvements in data quality and diversity.

With this architectural innovation, combined with a threefold increase in parameters and four times the training data, our model has taken a significant leap forward, particularly in its adherence to complex instructions and its rendering of extreme physics. The new model accurately interprets and executes highly detailed prompts, delivering more precise outputs. Furthermore, the efficiency gains from the new architecture also mean we can offer native 1080p video generation at a very affordable price point.

An early iteration of this model was tested by users on the Artificial Analysis Video Arena, where it secured the second position globally. Stay tuned for an upcoming new version!

These model enhancements are now fully integrated into the Hailuo Video web platform, mobile application, and our API platform. We currently offer three distinct versions: 768p-6s, 768p-10s, and 1080p-6s. True to our commitment, and thanks to the aforementioned architectural innovation, we continue to offer creators and developers the most open access and affordable pricing in the industry.

Through sustained technological research and development, coupled with deep collaborations with creators, developers, and artists, our mission and strategic direction have become ever clearer.

MiniMax Hailuo 02 represents a new milestone, and we are poised for rapid advancements in the following areas:

*   Enhancing generation speed
*   Improving alignment, leading to higher generation success rates and improved stability
*   Advancing model features beyond Text-to-Video (T2V) and Image-to-Video (I2V)

And, as always, we remain steadfast in our commitment to relentlessly exploring the upper limits of what technology and art can achieve together.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/hailuo-02/fast" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 6,
    "enable_prompt_expansion": true,
    "go_fast": true
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

No

\-

The positive prompt for the generation.

image

string

Yes

\-

The model generates video with the picture passed in as the first frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

duration

integer

No

6

6, 10

The duration of the generated media in seconds.

enable\_prompt\_expansion

boolean

No

true

\-

The model automatically optimizes incoming prompts to enhance output quality. This also activates the safety checker, which ensures content safety by detecting and filtering potential risks.

go\_fast

boolean

No

true

\-

Prioritize faster video generation speed with a moderate trade-off in visual quality

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

[Google Veo3 Image To Video](/docs/docs-api/google/google-veo3-image-to-video "Google Veo3 Image To Video")[Minimax Hailuo 02 I2V Pro](/docs/docs-api/minimax/minimax-hailuo-02-i2v-pro "Minimax Hailuo 02 I2V Pro")