#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Value Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void square(in vec2 st, in float n, in vec2 pos, in vec2 siz, in vec4 col, out vec4 res){
    vec2 bl = smoothstep(pos, pos + 0.04 * clamp(n, 0., 1.), st);
    vec2 tr = smoothstep(1. - pos - siz - 0.04 * clamp(n, 0., 1.), 1. - pos - siz, 1. - st);

    float pct = bl.x * bl.y * tr.x * tr.y;
    res = vec4(col.rgb * pct, res);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Scale the coordinate system to see
    // some noise in action
//    vec2 pos = vec2(st * 5. * u_mouse.x / u_resolution.x);
//    pos.x += u_time + u_mouse.y / u_resolution.y;

    float n1 = smoothstep(.0, 1., max(step(.3, noise(st * 5.)), .8)) * -1. + 1.9;
    float n2 = noise(st * 50.);
//    float pct = step(0.5, distance(st, vec2(n)));

    vec4 color = vec4(.0);
    vec2 pos = vec2(.03, .03);
    vec2 siz = vec2(.293 , .94);
    vec4 b_col = vec4(.824, .078, 0., 1.) * n1;
    vec4 box;
    float x = mod(st.x - .323 * floor(st.x * 3.), .293);
    square(st, n2, pos, siz, b_col, box);
    color += box;
    pos = vec2(.353, .03);
    b_col = vec4(.678, .063, 0., 1.) * n1;
    square(st, n2, pos, siz, b_col, box);
    color += box;
    pos = vec2(.676, .03);
    b_col = vec4(.867, .682, .271, 1.) * n1;
    square(st, n2, pos, siz, b_col, box);
    color += box;
    pos = vec2(0.);
    siz = vec2(0.);
    square(st, n2, pos, siz, b_col, box);
    color += box;
    gl_FragColor = vec4(color);
}