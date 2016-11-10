#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 mouse;
uniform float time;
uniform sampler2D texture;

varying vec2 vTexCoord;

void main(){
    // 係数を初期化
    // float f = 1.0;

    // マウスカーソルから対象ピクセルまでの相対的な距離を計測
    float mouseDistance = length(mouse - (vTexCoord * 2.0 - 1.0));

    // マウスカーソルからの距離が一定以上の場合は係数を小さくする
    float f = 1.0 - 0.8 * (sign(mouseDistance - 0.5) + 1.0) / 2.0;
    // if(mouseDistance > 0.5){
    //     f = 0.2;
    // }

    // テクスチャの色
    vec4 samplerColor = texture2D(texture, vTexCoord);

    // 最終出力カラー
    gl_FragColor = samplerColor * vec4(vec3(f), 1.0);

    // dummy
    float dummy = time;
}