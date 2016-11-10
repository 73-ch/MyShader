// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define PI 3.14159265358979323846

vec2 tile(vec2 _st, vec2 _zoom, out vec2 pos){
    _st *= _zoom;
    pos = ceil(_st);
    return fract(_st);
}

float random (vec2 st){
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    vec2 pos;
    vec2 stg;
    vec2 stb;
    float speed = (u_mouse.x / u_resolution.x - 0.5) * 2.;
    pos = ceil(st * vec2(1, 4.));
    stg = st;
    stb = st;

//patern1
    // st.x += mod(u_time, 10.) * sign(mod(pos.y, 2.)- 0.9) * speed;
    // st = tile(st,vec2(1, 4.), pos);
    // st.x = floor(st.x * 500. * u_mouse.y / u_resolution.y);

    // float rnd = step(.5, random(vec2(st.x, pos.y)));
    // color = vec3(1.0 * rnd);


// patern2
    // st.x += mod(u_time, 10.) * sign(mod(pos.y, 2.)- 0.9) * speed;
    // st = tile(st,vec2(1, 4.), pos);
    // st.x = floor(st.x * 500. * u_mouse.y / u_resolution.y);

    // float rnd = step(.5, random(vec2(st.x - 0.01, pos.y)));
    // color.r = 1.0 * rnd;
    // rnd = step(.5, random(vec2(st.x, pos.y)));
    // color.g = 1.0 * rnd;
    // rnd = step(.5, random(vec2(st.x + 0.01, pos.y)));
    // color.b = 1.0 * rnd;


// patern3
    st.x -= 0.005;
    st.x += mod(u_time, 10.) * sign(mod(pos.y, 2.)- 0.9) * speed;
    st = tile(st,vec2(1, 4.), pos);
    st.x = floor(st.x * 500. * u_mouse.y / u_resolution.y);

    float rnd = step(.5, random(vec2(st.x, pos.y)));
    color.r = 1.0 * rnd;

    stg.x += mod(u_time, 10.) * sign(mod(pos.y, 2.)- 0.9) * speed;
    stg = tile(stg,vec2(1, 4.), pos);
    stg.x = floor(stg.x * 500. * u_mouse.y / u_resolution.y);

    rnd = step(.5, random(vec2(stg.x, pos.y)));
    color.g = 1.0 * rnd;

    stb += 0.005;
    stb.x += mod(u_time, 10.) * sign(mod(pos.y, 2.)- 0.9) * speed;
    stb = tile(stb,vec2(1, 4.), pos);
    stb.x = floor(stb.x * 500. * u_mouse.y / u_resolution.y);

    rnd = step(.5, random(vec2(stb.x, pos.y)));
    color.b = 1.0 * rnd;



    gl_FragColor = vec4(color,1.0);
}