#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(.149,.141,.912);
vec3 colorB = vec3(1.,.833,.224);

float plot (vec2 st, float pct){
  return  smoothstep(pct - .01, pct, st.y) - smoothstep(pct, pct + .01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(.0);

    vec3 pct = vec3(st.x);

    float threshold = mod(u_time / 3., 1.);
    float color_num = (smoothstep(0., threshold + 0.1, st.x) - smoothstep(threshold - .1, 1., st.x));

    pct.r = color_num;
    pct.g = color_num * .5;
    pct.b = color_num;

    color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel
//    color = mix(color, vec3(1., 0., 0.), plot(st, pct.r));
//    color = mix(color, vec3(0., 1., 0.), plot(st, pct.g));
//    color = mix(color, vec3(0., 0. ,1.), plot(st, pct.b));

    gl_FragColor = vec4(color, 1.);
}