# webgl-points

- Add dokku remote: `git remote add dokku dokku@178.62.102.69:elevators`

## [Shaders](http://threejs.org/docs/#Reference/Materials/ShaderMaterial)

- Uniforms are variables that have the same value for all vertices---lighting, fog, and shadow maps are examples of data that would be stored in uniforms. Uniforms can be accessed by both the vertex shader and the fragment shader.

- Attributes are variables associated with each vertex---for instance, the vertex position, face normal, and vertex color are all examples of data that would be stored in attributes. Attributes can only be accessed within the vertex shader.

- Varyings are variables that are passed from the vertex shader to the fragment shader. For each fragment, the value of each varying will be smoothly interpolated from the values of adjacent vertices.

## Adding an app to dokku

- `ssh root@178.62.102.69`
- `dokku help`
- `dokku apps:create app-name`
- `dokku domains:add ...`
- Add dokku remote `dokku@178.62.102.69:app-name`
- `git push dokku master`
