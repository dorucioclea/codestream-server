// provides a class to handle rendering a codemark as HTML for email notifications

'use strict';

const Utils = require('./utils');
const Path = require('path');

const PROVIDER_DISPLAY_NAMES = {
	'github': 'GitHub',
	'bitbucket': 'Bitbucket',
	'gitlab': 'GitLab',
	'trello': 'Trello',
	'jira': 'Jira',
	'jiraserver': 'Jira Server',
	'asana': 'Asana',
	'youtrack': 'YouTrack',
	'slack': 'Slack',
	'msteams': 'Microsoft Teams',
	'azuredevops': 'Azure DevOps',
	'vsts': 'Visual Studio Team Services'
};

class CodemarkRenderer {

	/* eslint complexity: 0 */
	render (options) {
		const authorDiv = this.renderAuthorDiv(options);
		const titleDiv = this.renderTitleDiv(options);
		const visibleToDiv = this.renderVisibleToDiv(options);
		const tagsAssigneesTable = this.renderTagsAssigneesTable(options);
		const descriptionDiv = this.renderDescriptionDiv(options);
		const linkedIssuesDiv = this.renderLinkedIssuesDiv(options);
		const relatedDiv = this.renderRelatedDiv(options);
		const codeBlockDivs = this.renderCodeBlockDivs(options);

		return `
<div>
	${authorDiv}
	${titleDiv}
	${visibleToDiv}
	${tagsAssigneesTable}
	${descriptionDiv}
	${linkedIssuesDiv}
	${relatedDiv}
	${codeBlockDivs}
</div>
`;
	}

	// render the author line
	renderAuthorDiv (options) {
		const { codemark, creator, timeZone } = options;
		const authorOptions = {
			time: codemark.createdAt,
			creator,
			timeZone,
			datetimeField: 'datetime'
		};
		return Utils.renderAuthorDiv(authorOptions);
	}

	// render the div for the title
	renderTitleDiv (options) {
		const { codemark, mentionedUserIds, members } = options;
		// display title: the codemark title if there is one, or just the codemark text
		const title = Utils.prepareForEmail(codemark.title || codemark.text, mentionedUserIds, members);
		return `
<div class="title">
	${title}
	<br>
</div>
`;
	}

	// render the div for whom the codemark is visible, if a private codemark
	renderVisibleToDiv (options) {
		const { stream } = options;
		if (stream.privacy === 'public') {
			return '';
		}

		let usernames = this.getVisibleTo(options);
		return `
<div class="section nice-gray section-text" >VISIBLE TO</div>
<div>${usernames}</div>
`;
	}

	// get the label to use for "visible to"
	getVisibleTo (options) {
		const { stream, members } = options;
		if (stream.type === 'channel') {
			return stream.name;
		}

		const usernames = [];
		for (let memberId of stream.memberIds) {
			const member = members.find(member => member.id === memberId);
			if (member) {
				usernames.push(member.username);
			}
		}

		if (usernames.length > 3) {
			const nOthers = usernames.length - 2;
			return `${usernames.slice(0, 2).join(', ')} & ${nOthers} others`;
		}
		else {
			return usernames.join(', ');
		}
	}

	// render the table for the tags and assignees, which are displayed side-by-side
	renderTagsAssigneesTable (options) {
		const { codemark, members } = options;

		let tagsHeader = '';
		if (codemark.tags && codemark.tags.length > 0) {
			tagsHeader = 'TAGS';
		}

		let assigneesHeader = '';
		let assignees = [];
		if (
			(codemark.assignees && codemark.assignees.length > 0) ||
			(codemark.externalAssignees && codemark.externalAssignees.length > 0)
		) {
			assigneesHeader = 'ASSIGNEES';
			(codemark.assignees || []).forEach(assigneeId => {
				const user = members.find(member => member.id === assigneeId);
				if (user) {
					assignees.push(user);
				}
			});
			assignees = [...assignees, ...(codemark.externalAssignees || [])];
		}

		let tagsAssigneesTable = '';
		if (tagsHeader || assigneesHeader) {
			tagsAssigneesTable = '<table class="section"><tbody><tr>';
			if (tagsHeader) {
				tagsAssigneesTable += `<td width=300px class="nice-gray section-text">${tagsHeader}</td>`;
			}
			if (assigneesHeader) {
				tagsAssigneesTable += `<td width=300px class="nice-gray section-text">${assigneesHeader}</td>`;
			}

			const numRows = assigneesHeader ? assignees.length : 1;
			for (let nRow = 0; nRow < numRows; nRow++) {
				tagsAssigneesTable += '</tr><tr>';
				if (tagsHeader) {
					if (nRow === 0) {
						const tags = Utils.renderTags(options);
						tagsAssigneesTable += `<td width=300px">${tags}</td>`;
					}
					else {
						tagsAssigneesTable += '<td width=300px>&nbsp;</td>';
					}
				}
				if (assigneesHeader) {
					const assignee = this.renderAssignee(assignees[nRow]);
					tagsAssigneesTable += `<td width=300px>${assignee}</id>`;
				}
				tagsAssigneesTable += '</tr>';
			}
			
			tagsAssigneesTable += '</tbody></table>';
		}

		return tagsAssigneesTable;
	}

	// render a single task assignee
	renderAssignee (assignee) {
		const assigneeDisplay = assignee.fullName || assignee.displayName || assignee.username || assignee.email;
		const assigneeHeadshot = Utils.renderUserHeadshot(assignee);
		return `
			${assigneeHeadshot}
<span class="assignee">${assigneeDisplay}</span>
`;
	}

	// render the description div, as needed
	renderDescriptionDiv (options) {
		const { codemark, mentionedUserIds, members } = options;
		// there is a description if there is both a title and text, in which case it's the text
		if (codemark.title && codemark.text) {
			const text = Utils.prepareForEmail(codemark.text, mentionedUserIds, members);
			const iconHtml = Utils.renderIcon('description');
			return `
<div class="section nice-gray section-text">DESCRIPTION</div>
<div>
	${iconHtml}<br/>
	${text}
</div>
`;
		}
		else {
			return '';
		}
	}

	// render any linked issues
	renderLinkedIssuesDiv (options) {
		const { codemark } = options;
		if (!codemark.externalProvider) { return ''; }
		const providerName = PROVIDER_DISPLAY_NAMES[codemark.externalProvider] || codemark.externalProvider;
		const providerUrl = codemark.externalProviderUrl;
		let iconHtml = Utils.renderIcon(codemark.externalProvider);
		return `
<div class="section nice-gray section-text">LINKED ISSUES</div>
<div class="issue hover-underline">
	${iconHtml}
	<a clicktracking="off" href="${providerUrl}" class="space-left">${providerName} ${providerUrl}</a>
</div>
`;
	}

	// render the related codemarks, if any
	renderRelatedDiv (options) {
		const { codemark, relatedCodemarks } = options;
		// list related codemarks, if any
		let relatedDivs = '';
		for (let relatedCodemarkId of codemark.relatedCodemarkIds || []) {
			const relatedCodemark = relatedCodemarks.find(relatedCodemark => relatedCodemark.id === relatedCodemarkId);
			if (relatedCodemark) {
				relatedDivs += this.renderRelatedCodemark(relatedCodemark, options);
			}
		}
		if (relatedDivs) {
			return `
<div class="section nice-gray section-text">RELATED</div>
${relatedDivs}
`;
		}
		else {
			return '';
		}
	}

	// render a related codemark
	renderRelatedCodemark (codemark, options) {
		const { markers } = options;
		let path = '';
		if (codemark.markerIds && codemark.markerIds.length > 0) {
			const markerId = codemark.markerIds[0];
			const marker = markers.find(marker => marker.id === markerId);
			if (marker) {
				const repo = this.getRepoForMarker(marker, options);
				const file = this.getFileForMarker(marker, options);
				if (repo) {
					path += `[${repo}] `;
				}
				if (file) {
					path += file;
				}
			}
		}

		const relatedTitle = Utils.cleanForEmail(codemark.title || codemark.text);
		const iconHtml = Utils.renderIcon(codemark.type);
		return `
<div class="related">
	${iconHtml}
	<a clicktracking="off" href="${codemark.permalink}">
		<span class="related-title space-left">${relatedTitle}</span><span class="nice-gray space-left hover-underline">${path}</span>
	</a>
</div>
`;

	}

	// get repo name appropriate to display a marker
	getRepoForMarker (marker, options) {
		const { repos } = options;
		let repoUrl = marker.repo || '';
		if (!repoUrl && marker.repoId) {
			const repo = repos.find(repo => repo.id === marker.repoId);
			if (repo && repo.remotes && repo.remotes.length > 0) {
				repoUrl = repo.remotes[0].normalizedUrl;
			}
		}
		if (repoUrl) {
			repoUrl = this.bareRepo(repoUrl);
		}
		return repoUrl;
	}

	// get file name appropriate to display for a marker
	getFileForMarker (marker, options) {
		const { fileStreams } = options;
		let file = marker.file || '';
		if (marker.fileStreamId) {
			const fileStream = fileStreams.find(fileStream => fileStream.id === marker.fileStreamId);
			if (fileStream) {
				file = fileStream.file;
			}
		}
		if (file.startsWith('/')) {
			file = file.slice(1);
		}
		return file;
	}

	bareRepo (repo) {
		if (repo.match(/^(bitbucket\.org|github\.com)\/(.+)\//)) {
			repo = repo
				.split('/')
				.splice(2)
				.join('/');
		} else if (repo.indexOf('/') !== -1) {
			repo = repo
				.split('/')
				.splice(1)
				.join('/');
		}
		return repo;
	}

	// render the code block divs, if any
	renderCodeBlockDivs (options) {
		const { codemark, markers } = options;
		// display code blocks
		let codeBlockDivs = '';
		for (let markerId of codemark.markerIds || []) {
			const marker = markers.find(marker => marker.id === markerId);
			if (marker && marker.code) {
				codeBlockDivs += this.renderCodeBlock(marker, options);
			}
		}
		return codeBlockDivs;
	}

	// render a single code block
	renderCodeBlock (marker, options) {
		const { branchWhenCreated, commitHashWhenCreated } = marker;
		const repo = this.getRepoForMarker(marker, options);
		const file = this.getFileForMarker(marker, options);
		const branch = branchWhenCreated || '';
		const commitHash = commitHashWhenCreated ? commitHashWhenCreated.slice(0, 7) : '';

		// get buttons to display
		let buttons = Utils.renderCodemarkButtons(options, marker);

		// get code for the given marker
		let code = (marker.code || '').trimEnd();

		// setup line numbering
		const numLines = code.split('\n').length;
		let lineNumbers = '';
		const locationWhenCreated = marker.locationWhenCreated || (marker.referenceLocations && marker.referenceLocations[0]);
		const startLine = (locationWhenCreated && locationWhenCreated.location && locationWhenCreated.location[0]) || 0;
		for (let i = 0; i < numLines; i++) {
			lineNumbers += `<span>${startLine + 1 + i}.&nbsp;</span><br/>`;
		}

		let codeWidth = '100%';
		if (lineNumbers) {
			codeWidth = '90%';
			lineNumbers = `
<td width=10%>
	<div class="line-numbers monospace">
		${lineNumbers}
	</div>
</td>
`;
		}
		if (file) {
			// do syntax highlighting for the code, based on the file extension
			let extension = Path.extname(file).toLowerCase();
			if (extension.startsWith('.')) {
				extension = extension.substring(1);
			}
			code = Utils.highlightCode(code, extension);
		}

		const repoIcon = Utils.renderIcon('repo');
		const fileIcon = Utils.renderIcon('file');
		const branchIcon = Utils.renderIcon('git-branch');
		const commitIcon = Utils.renderIcon('git-commit');

		return `
<div class="codeblock-text monospace">
	${repoIcon}
	<span class="space-left codeblock-heading">${repo}</span>
	${fileIcon}
	<span class="space-left codeblock-heading">${file}</span>
	${branchIcon}
	<span class="space-left monospace codeblock-heading">${branch}</span>
	${commitIcon}
	<span class="space-left monospace codeblock-heading">${commitHash}</span>
</div>
<table cellspacing="0" cellpadding="0">
	<tr>
		${lineNumbers}
		<td width=${codeWidth}>
			<div class="code-wrapper monospace">${code}</div>
		</td>
	<tr>
</table>
${buttons}
`;
	}
}

module.exports = CodemarkRenderer;
