<template>
  <div class="upload-container">
    <span v-if="title" class="title">{{ title }}</span>
    <input
      type="file"
      :multiple="multiple"
      hidden
      :id="randomKey"
      @change="handleFilesUpload($event)"
    />
    <label
      :for="randomKey"
      @drop.prevent="
        handleFileDrop($event);
        inDragZone = false;
      "
      @dragover.prevent
      @dragenter="inDragZone = true"
      @dragleave="inDragZone = false"
      @dragend="inDragZone = false"
    >
      <div class="container" :class="[inDragZone ? 'active' : '', { invalid }]">
        <base-icon
          class="icon"
          :icon-color="invalid ? 'danger' : 'primary'"
          icon-src="static/icons/shared/upload.svg"
        ></base-icon>
        <p :class="{ invalid }">
          <template v-if="!inDragZone">
            <span>Browse</span>
            {{ multiple ? "files" : "file" }} or drag & drop <br />
            .pdf, .png up to {{ sizeLimit }}mb
          </template>
          <template v-else>
            <span>Release</span>
            to Upload File
          </template>
        </p>
      </div>
    </label>
    <div class="files" v-for="(file, key) in uploadedFiles" :key="'file-' + key">
      <div class="info">
        <img
          v-if="determineFileType(file.type)"
          class="type"
          :src="determineFileType(file.type)"
          alt="file-type"
        />
        <span>{{ file.name }}, {{ Math.round((file.size / 1000000) * 100) / 100 }} MB</span>
      </div>
      <div class="remove-icon" @click="removeFile(key)">
        <base-icon
          class="icon"
          icon-color="additional-medium"
          icon-src="static/icons/shared/close.svg"
        ></base-icon>
      </div>
    </div>
    <section class="errors" v-if="errors.length !== 0">
      <span v-for="(error, index) in errors" :key="index">
        {{ error.$message }}
      </span>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import BaseIcon from "@/app/core/components/BaseIcon.vue";
import { determineFileType } from "@/app/core/utils/determineFileType";

export default defineComponent({
  name: "BaseFileUpload",
  emits: ["update:files"],
  components: { BaseIcon },
  props: {
    title: {
      required: false,
      type: String,
    },
    sizeLimit: {
      required: true,
      type: Number,
    },
    multiple: {
      required: false,
      type: Boolean,
    },
    countMax: {
      required: false,
      type: Number,
    },
    files: {
      required: true,
      type: Object as PropType<Array<Blob> | Blob>,
    },
    errors: {
      type: Array as PropType<Array<string>>,
      required: false,
      default: () => [],
    },
  },
  setup(props, context) {
    let inDragZone = ref<boolean>(false);
    let uploadedFiles = ref<Array<Blob>>([]);

    watch(
      () => props.files,
      (newFiles) => {
        if (Array.isArray(newFiles)) {
          uploadedFiles.value = newFiles;
        } else if (newFiles instanceof Blob) {
          uploadedFiles.value[0] = newFiles;
        } else if (typeof newFiles === "undefined") {
          uploadedFiles.value = [];
        }
      }
    );

    const handleFileDrop = (event: any) => {
      if (props.multiple) {
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
          uploadedFiles.value.push(event.dataTransfer.files[i]);
          context.emit("update:files", uploadedFiles.value);
        }
      } else {
        uploadedFiles.value[0] = event.dataTransfer.files[0];
        context.emit("update:files", uploadedFiles.value[0]);
      }
    };

    const handleFilesUpload = (event: any) => {
      let requestFiles = event.target.files;
      if (props.multiple) {
        for (let i = 0; i < requestFiles.length; i++) {
          uploadedFiles.value.push(requestFiles[i]);
          context.emit("update:files", uploadedFiles.value);
        }
      } else {
        uploadedFiles.value[0] = requestFiles[0];
        context.emit("update:files", uploadedFiles.value[0]);
      }
    };

    const removeFile = (key: number) => {
      uploadedFiles.value.splice(key, 1);
      if (props.multiple) {
        context.emit("update:files", uploadedFiles.value);
      } else {
        context.emit("update:files", undefined);
      }
    };

    const invalid = computed(() => {
      return props.errors?.length !== 0;
    });

    return {
      inDragZone,
      uploadedFiles,
      handleFileDrop,
      handleFilesUpload,
      removeFile,
      determineFileType,
      invalid,
      randomKey: Math.random().toString(36),
    };
  },
});
</script>

<style scoped lang="scss">
.upload-container {
  .title {
    display: flex;
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 15px;
    margin-bottom: 6px;
  }

  label {
    .container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
      padding: 32px 45px;
      border: var(--primary) 1px dashed;
      border-radius: 4px;
      cursor: pointer;
      min-height: 160px;

      &.invalid {
        border-color: var(--danger);
      }

      &.active {
        border: var(--primary) 1px solid;
      }

      .icon {
        width: 30px;
        height: 30px;
      }

      p {
        color: var(--text-cta);
        font-size: 16px;
        line-height: 20px;
        text-align: center;

        &.invalid {
          color: var(--danger);
        }

        span {
          text-decoration: underline;
        }
      }
    }
  }

  .files {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .info {
      display: flex;
      gap: 10px;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
      }

      span {
        color: var(--text-secondary);
      }
    }

    .remove-icon {
      cursor: pointer;
      .icon {
        width: 12px;
        height: 12px;
      }
    }
  }

  .errors {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 3px;
    font-size: 13px;
    line-height: 15px;
    color: var(--danger);
  }
}
</style>
