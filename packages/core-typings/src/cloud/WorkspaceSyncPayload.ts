/* eslint-disable @typescript-eslint/naming-convention */

import type * as UiKit from '@rocket.chat/ui-kit';
import * as z from 'zod';

import type { IBanner } from '../IBanner';
import type { Announcement } from './Announcement';
import type { NpsSurveyAnnouncement } from './NpsSurveyAnnouncement';

export interface WorkspaceSyncPayload {
	workspaceId: string;
	publicKey?: string;
	trial?: {
		trialing: boolean;
		trialID: string;
		endDate: Date;
		marketing: {
			utmContent: string;
			utmMedium: string;
			utmSource: string;
			utmCampaign: string;
		};
		DowngradesToPlan: {
			id: string;
		};
		trialRequested: boolean;
	};
	/** @deprecated */
	nps?: NpsSurveyAnnouncement;
	/** @deprecated */
	banners?: IBanner[];
}

export interface WorkspaceSyncRequestPayload {
	uniqueId: string;
	workspaceId: string;
	seats: number;
	MAC: number; // Need to align on the property
	address: string;
	siteName: string;
	deploymentMethod: string;
	deploymentPlatform: string;
	version: string;
	licenseVersion: number;
	connectionDisable: boolean;
}

export const WorkspaceSyncResponseSchema = z.object({
	workspaceId: z.string(),
	publicKey: z.string().optional(),
	license: z.string(),
	removeLicense: z.boolean().optional(),
	cloudSyncAnnouncement: z.unknown(),
});

export type WorkspaceSyncResponse = z.infer<typeof WorkspaceSyncResponseSchema>;

export interface WorkspaceCommsRequestPayload {
	npsEnabled: boolean;
	deploymentMethod: string;
	deploymentPlatform: string;
	version: string;
}

export interface WorkspaceCommsResponsePayload {
	nps?: NpsSurveyAnnouncement | null; // Potentially consolidate into announcements
	announcements?: {
		create: Announcement[];
		delete: Announcement['_id'][];
	};
}

export interface WorkspaceInteractionResponsePayload {
	serverInteraction: UiKit.ServerInteraction;
	serverAction?: 'syncWorkspace';
}
