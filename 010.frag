
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 sound;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct - .01, pct, st.y) - smoothstep( pct, pct + .01, st.y);
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.);

    vec2 pos = vec2(.5) - st;

    float r = length(pos) * 2.792;
    float a = atan(pos.y, pos.x);

    float f = cos(a * 3. * u_time);
    // f = abs(cos(a * 3. * u_time));
    f = abs(cos(a * 2.5 * u_time)) * .5 + .3;
    f = abs(cos(a * 2. * u_time) * sin(a * 5. * u_time)) * .8 + .1;
    f = abs(cos(a * 2. * u_time) * sin(a * 5. * u_time)) * .8 + .1;
    // f = abs(cos(a * 12. * u_time) * sin(a * 3. * mod(u_time, 20.))) * .8 + .1;
    // f = smoothstep(-.5, 1., cos(a * 10. * u_time)) * .2 + .5;

    color = vec3(1.);
    color += -smoothstep(f * sound.y * 2., f - sound.x, r - step(f * sound.z, r));
    color +=  smoothstep(f * sound.y - .1, f + sound.x + .5 + .1, r  - step(f * sound.z + .1, r));
    color += -smoothstep(f * sound.y + .3, f - sound.x + .5 - .3, r  + step(f * sound.z + .3, r)) -step(f * sound.z + .3, r) * .7;
    color +=  smoothstep(f * sound.y - .5, f - sound.x + .5 + .5, r) - step(f * sound.z + .5, r) * .1;
    color += -smoothstep(f * sound.y + .7, f + sound.x + .5 - .7, r  + step(f * sound.z + .7, r)) - step(f * sound.z + .7, r);

    gl_FragColor = vec4(color, 1.);

    // float result = plot(st, color.x);
    // gl_FragColor = vec4(vec3(result), 1.);
}