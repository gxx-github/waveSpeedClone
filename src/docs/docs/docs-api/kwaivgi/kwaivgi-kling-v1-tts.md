# /docs/docs-api/kwaivgi/kwaivgi-kling-v1-tts

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v1-tts

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V1 Tts

# Kwaivgi Kling V1 Tts

Kwaivgi Kling V1 Tts

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v1-tts)

Generate audio with KlingAI’s AI toolkit. Features image creation, video generation, sound effects, virtual models, and custom AI tools, Your request will cost $0.1 per 1000 characters.

## Features[](#features)

Generate audio with KlingAI’s AI toolkit. Features image creation, video generation, sound effects, virtual models, and custom AI tools, Your request will cost $0.1 per 1000 characters.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v1-tts" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "voice_id": "genshin_vindi2",
    "speed": 1
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

text

string

Yes

\-

\-

The text to be converted to speech. the max length is 512 characters.

voice\_id

string

Yes

genshin\_vindi2

genshin\_vindi2, zhinen\_xuesheng, AOT, ai\_shatang, genshin\_klee2, genshin\_kirara, ai\_kaiya, oversea\_male1, ai\_chenjiahao\_712, girlfriend\_4\_speech02, chat1\_female\_new-3, chat\_0407\_5-1, cartoon-boy-07, uk\_boy1, cartoon-girl-01, PeppaPig\_platform, ai\_huangzhong\_712, ai\_huangyaoshi\_712, ai\_laoguowang\_712, chengshu\_jiejie, you\_pingjing, calm\_story1, uk\_man2, laopopo\_speech02, heainainai\_speech02, reader\_en\_m-v1, commercial\_lady\_en\_f-v1, tiyuxi\_xuedi, tiexin\_nanyou, girlfriend\_1\_speech02, girlfriend\_2\_speech02, zhuxi\_speech02, uk\_oldman3, dongbeilaotie\_speech02, chongqingxiaohuo\_speech02, chuanmeizi\_speech02, chaoshandashu\_speech02, ai\_taiwan\_man2\_speech02, xianzhanggui\_speech02, tianjinjiejie\_speech02, diyinnansang\_DB\_CN\_M\_04-v2, yizhipiannan-v1, guanxiaofang-v2, tianmeixuemei-v1, daopianyansang-v1, mengwa-v1

Voice ID for audio generation.

speed

number

No

1

0.8 ~ 2.0

Speech speed. Range: 0.8-2.0, where 1.0 is normal speed.

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

[Kwaivgi Kling V1 AI Avatar Standard](/docs/docs-api/kwaivgi/kwaivgi-kling-v1-ai-avatar-standard "Kwaivgi Kling V1 AI Avatar Standard")[Kwaivgi Kling V1.6 I2V Pro](/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-i2v-pro "Kwaivgi Kling V1.6 I2V Pro")