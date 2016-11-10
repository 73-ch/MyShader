// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rnd(vec2 n){
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void square(in vec2 st,in vec2 pos, in vec2 siz, in vec4 col, out vec4 res){
    vec2 bl = step(pos, st);
    vec2 tr = step(1. - pos - siz, 1. - st);

    float pct = bl.x * bl.y * tr.x * tr.y;
    res = vec4(col.rgb * pct, res);
}

void borderSquare(in vec2 st,in vec2 pos, in vec2 siz, in float wid, in vec4 col, out vec4 res){
    vec2 bl = step(pos, st);
    vec2 tr = step(1. - pos - siz, 1. - st);

    vec2 ibl = step(pos + wid, st);
    vec2 itr = step(1. - pos + wid - siz, 1. - st);

    float pct = bl.x * bl.y * tr.x * tr.y * sign(abs(ibl.x + ibl.y - 2.0) + abs(itr.x + itr.y - 2.));

    res = vec4(col.rgb * pct, res);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0.0);


    // bottom-left
    // top-right

    // 普通の四角
    // vec2 bl = step(vec2(0.300,0.300),st);
    // vec2 tr = step(vec2(0.390,0.330),1.-st);

    // 輪郭ぼやけ
    // vec2 bl = smoothstep(vec2(0.300,0.300), vec2(0.4,0.4),st);
    // vec2 tr = smoothstep(vec2(0.300,0.300), vec2(0.4,0.4),1.-st);

    // 謎の形
    // vec2 bl = vec2(step(vec2(smoothstep(1.312, -1.316, st.y),smoothstep(1.056, -0.860, st.x)), st));
    // vec2 tr = vec2(step(vec2(-smoothstep(1.088, -0.164, st.y),-smoothstep(0.944, -0.276, st.x)), -st));
    for(float i = 0.; i < 30.; i++){
        float rnd_x = rnd(vec2(cos(i), u_mouse.x)) /2. - 0.5;
        float rnd_y = rnd(vec2(sin(i), u_mouse.y)) /2. - 0.5;
        vec2 pos = u_mouse/u_resolution + vec2(rnd_x, rnd_y);
        vec2 siz = vec2(abs(sin(u_time * rnd_x)) / 2., abs(cos(u_time * rnd_y * 2.) / 2.));
        float wid = 0.008;
        vec4 b_col = vec4(vec3(0.5), 0.8);
        vec4 box;
        borderSquare(st, pos, siz, wid, b_col, box);
        color += box;
    }


    // float pct = bl.x * bl.y;
    // pct *= tr.x * tr.y;

    // color = vec4(vec3(pct), 1.0);

    gl_FragColor = vec4(color);
}