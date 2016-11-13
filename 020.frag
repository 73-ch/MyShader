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
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1., 0.));
    float c = random(i + vec2(0., 1.));
    float d = random(i + vec2(1., 1.));

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3. - 2. * f);
    u = smoothstep(0., 1., f);
//    u = smoothstep(0., 1., f) + sin(mod(u_time, 10.)) * 5.;

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1. - u.x) +
            (d - b) * u.x * u.y;
}

void square(in vec2 st, in float n, in vec2 pos, in vec2 siz, in vec4 col, out vec4 res){
    vec2 bl = smoothstep(pos, pos + 0.02 * noise(vec2(n)), st);
    vec2 tr = smoothstep(1. - pos - siz - 0.03 * noise(vec2(n)), 1. - pos - siz, 1. - st);

    float pct = bl.x * bl.y * tr.x * tr.y;
    res = vec4(col.rgb * pct, res);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Scale the coordinate system to see
    // some noise in action
//    vec2 pos = vec2(st * 5. * u_mouse.x / u_resolution.x);
//    pos.x += u_time + u_mouse.y / u_resolution.y;

    float n1 = smoothstep(.0, 1., max(step(.3, noise(st * 5.)) * noise(st * 5.), .8)) * -1. + 1.9;
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