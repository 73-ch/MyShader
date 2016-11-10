precision mediump float;

uniform vec2 mouse;
uniform float time;
uniform sampler2D texture;

varying vec2 vTexCoord;

// モノクロ化するための係数
const float redScale   = 0.298912;
const float greenScale = 0.586611;
const float blueScale  = 0.114478;
const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);

// セピアカラー化するための係数
const float sRedScale   = 1.07;
const float sGreenScale = 0.74;
const float sBlueScale  = 0.43;
const vec3  sepiaScale = vec3(sRedScale, sGreenScale, sBlueScale);

void main(){
    // 内積
    // vec v1 ,v2;

    // v1.x * v2.x +
    // v1.y * v2.y +
    // v1.z * v2.z = dot

    // テクスチャの色
    vec4 samplerColor = texture2D(texture, vTexCoord);

    // モノクロ変換
    // float mono = dot(samplerColor.rgb, monochromeScale);
    float mono = samplerColor.r * monochromeScale.r;


    // 最終出力カラー
    gl_FragColor = vec4(sepiaScale * mono, samplerColor.a);

    // dummy
    float dummy = mouse.x + time;
}
