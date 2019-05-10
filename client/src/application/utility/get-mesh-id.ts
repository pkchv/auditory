import { Mesh, AbstractMesh } from 'babylonjs';

export function getId(mesh: Mesh | AbstractMesh): string {
    const id = 'uuid'
    if (id in mesh) {
        return mesh[id]
    }

    return mesh.name;
}
